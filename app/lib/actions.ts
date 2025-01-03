"use server"; //Ao adicionar o 'use server', você marca todas as funções exportadas dentro do arquivo como Server Actions. Essas funções de servidor podem então ser importadas e usadas em componentes Client e Server.
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//Você também pode escrever Server Actions diretamente dentro de Server Components adicionando "use server"dentro da ação. Mas para este curso, manteremos todos eles organizados em um arquivo separado.

import { z } from "zod";

//Para lidar com a validação de tipo, você tem algumas opções. Embora você possa validar tipos manualmente, usar uma biblioteca de validação de tipo pode economizar tempo e esforço. Para seu exemplo, usaremos Zod, uma biblioteca de validação que prioriza o TypeScript e que pode simplificar essa tarefa para você.
// importe Zod e defina um esquema que corresponda ao formato do seu objeto de formulário. Este esquema validará o formData antes de salvá-lo em um banco de dados.
//vamos usar o zod para validar dados de formulario tmabém
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Selecione um cliente.",
  }),
  amount: z.coerce.number().gt(0, { message: "Insira um valor maior que $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Selecione um status de fatura.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

//Ação do Servidor que será chamada quando o formulário for enviado.
//prevState- contém o estado passado do useActionStatehook. Você não o usará na ação neste exemplo, mas é um prop necessário.
export async function createInvoice(prevState: State, formData: FormData) {
  //Dica: Se você estiver trabalhando com formulários que têm muitos campos, considere usar oentries()método com JavaScriptObject.fromEntries(). Por exemplo:
  //const rawFormData = Object.fromEntries(formData.entries());

  //validando os tipos
  // Validate form fields using Zod
  //safeParse() retornará um objeto contendo um campo success ou error.
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  //Se a validação do formulário falhar, retorne erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  //Geralmente, é uma boa prática armazenar valores monetários em centavos no seu banco de dados para eliminar erros de ponto flutuante do JavaScript e garantir maior precisão.
  //Vamos converter o valor em centavos:
  const amountInCents = amount * 100;

  //Por fim, vamos criar uma nova data com o formato "AAAA-MM-DD" para a data de criação da fatura:
  const date = new Date().toISOString().split("T")[0];

  try {
    //Agora que você tem todos os valores necessários para seu banco de dados, você pode criar uma consulta SQL para inserir a nova fatura em seu banco de dados e passar as variáveis:
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  //O Next.js tem um Cache de Roteador do Lado do Cliente que armazena os segmentos de rota no navegador do usuário por um tempo. Junto com o prefetching , esse cache garante que os usuários possam navegar rapidamente entre as rotas, reduzindo o número de solicitações feitas ao servidor.
  //Como você está atualizando os dados exibidos na rota de faturas, você quer limpar esse cache e disparar uma nova solicitação para o servidor.
  //Depois que o banco de dados for atualizado, o /dashboard/invoicescaminho será revalidado e novos dados serão buscados do servidor.
  revalidatePath("/dashboard/invoices");
  //Neste ponto, você também quer redirecionar o usuário de volta para a /dashboard/invoices página. Você pode fazer isso com a redirect função do Next.js:
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  //Extraindo os dados de formData.
  //Validando os tipos com Zod.
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos ausentes. Falha ao atualizar fatura.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  //Convertendo o valor em centavos.
  const amountInCents = amount * 100;

  try {
    //Passando as variáveis ​​para sua consulta SQL.
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  //Chamada revalidatePathpara limpar o cache do cliente e fazer uma nova solicitação ao servidor.
  revalidatePath("/dashboard/invoices");
  //Chamada redirectpara redirecionar o usuário para a página da fatura.
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    //Como essa ação está sendo chamada no /dashboard/invoices caminho, você não precisa chamar redirect. A chamada revalidatePath acionará uma nova solicitação de servidor e renderizará novamente a tabela.
    //Observe como o redirect está sendo chamado fora do bloco try/catch. Isso ocorre porque o redirect funciona lançando um erro, que seria capturado pelo bloco catch. Para evitar isso, você pode chamar o redirect após o try/catch. O redirect só seria alcançável se o try fosse bem-sucedido.
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
}
