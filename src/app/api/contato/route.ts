import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Requisição inválida.' },
      { status: 400 },
    );
  }

  const nome = String(body.nome ?? '').trim();
  const email = String(body.email ?? '').trim();
  const telefone = String(body.telefone ?? '').trim();
  const mensagem = String(body.mensagem ?? '').trim();
  const aceite = body.aceite === true;

  // Validação no servidor (a do navegador pode ser burlada)
  if (
    !nome ||
    !telefone ||
    !mensagem ||
    !aceite ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    mensagem.length > 500 ||
    nome.length > 100
  ) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email, // ao clicar em "Responder", vai direto para o cliente
    subject: `Novo contato pelo site — ${nome}`,
    html: `
      <h2>Nova mensagem pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(telefone)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(mensagem).replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color:#888;font-size:12px">O cliente aceitou receber retorno por WhatsApp e a Política de Privacidade.</p>
    `,
  });

  if (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Falha ao enviar.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
