'use client';

import { useState } from 'react';
import { Mail, User, Phone, Send, Lock } from 'lucide-react';
import Link from 'next/link';

const MAX = 500;

const inputWrapper =
  'bg-fundo-principal border-bordas focus-within:border-vermelho-principal flex items-center gap-2 rounded-lg border px-3';
const inputClass =
  'w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-600';
const labelClass = 'mb-2 block text-xs font-semibold text-white';

export default function ContatoForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
    aceite: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Máscara simples: (11) 99999-0000
  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus('sent');
      setForm({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
        aceite: false,
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border-bordas rounded-2xl border p-6 md:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="bg-vermelho-principal/15 text-vermelho-principal flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          <Mail size={18} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Envie uma mensagem</h2>
          <p className="text-xs text-gray-400">
            Preencha os campos abaixo e um consultor retorna por e-mail ou
            telefone.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className={labelClass}>
            Nome completo
          </label>
          <div className={inputWrapper}>
            <User size={14} className="text-gray-500" />
            <input
              id="nome"
              required
              value={form.nome}
              onChange={(e) => update('nome', e.target.value)}
              placeholder="Como podemos te chamar?"
              className={inputClass}
            />
          </div>
        </div>

        {/* E-mail e telefone */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              E-mail
            </label>
            <div className={inputWrapper}>
              <Mail size={14} className="text-gray-500" />
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="seuemail@exemplo.com"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="telefone" className={labelClass}>
              Telefone / WhatsApp
            </label>
            <div className={inputWrapper}>
              <Phone size={14} className="text-gray-500" />
              <input
                id="telefone"
                type="tel"
                required
                value={form.telefone}
                onChange={(e) => update('telefone', maskPhone(e.target.value))}
                placeholder="(11) 99999-0000"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="mensagem" className={labelClass}>
              Mensagem
            </label>
            <span className="mb-2 text-[11px] text-gray-500">
              {form.mensagem.length} / {MAX}
            </span>
          </div>
          <textarea
            id="mensagem"
            required
            rows={5}
            maxLength={MAX}
            value={form.mensagem}
            onChange={(e) => update('mensagem', e.target.value)}
            placeholder="Ex.: Tenho interesse no Jeep Compass Limited 2022. Ele ainda está disponível? Gostaria de agendar um test drive no sábado."
            className="bg-fundo-principal border-bordas focus:border-vermelho-principal w-full resize-none rounded-lg border p-3 text-sm text-white outline-none placeholder:text-gray-600"
          />
        </div>

        {/* Aceite */}
        <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-300">
          <input
            type="checkbox"
            required
            checked={form.aceite}
            onChange={(e) => update('aceite', e.target.checked)}
            className="accent-vermelho-principal mt-0.5 h-4 w-4"
          />
          <span>
            Aceito receber o retorno por WhatsApp e concordo com a{' '}
            <Link
              href="/politica-privacidade"
              className="font-semibold text-white underline"
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <Lock size={11} />
          Seus dados estão protegidos pela LGPD.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-vermelho-principal flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
          <Send size={14} />
        </button>
      </div>

      {status === 'sent' && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-400"
        >
          Mensagem enviada! Um consultor entrará em contato em breve.
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400"
        >
          Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
        </p>
      )}
    </form>
  );
}
