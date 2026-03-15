"use client";

import { useState, useMemo } from "react";

interface Inputs {
  desiredSalary: string;
  monthlyExpenses: string;
  hoursPerWeek: string;
  weeksPerYear: string;
  profitMargin: string;
  taxRate: string;
}

interface PlatformFee {
  name: string;
  percentFee: number;
  fixedFee: number;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const PLATFORMS: PlatformFee[] = [
  {
    name: "PayPal",
    percentFee: 5.4,
    fixedFee: 0.3,
    description: "Comisión estándar para pagos internacionales",
    color: "blue",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.49A.77.77 0 0 1 5.704 1.9h6.306c2.094 0 3.592.526 4.456 1.564.393.473.653 1.002.777 1.574.129.6.132 1.316.006 2.127l-.013.08v.713l.555.318a3.2 3.2 0 0 1 1.126 1.01c.32.457.527.99.613 1.583.09.607.057 1.31-.094 2.086-.176.906-.46 1.695-.846 2.344a4.83 4.83 0 0 1-1.34 1.484 5.16 5.16 0 0 1-1.797.866c-.675.2-1.43.3-2.244.3h-.535a1.62 1.62 0 0 0-1.6 1.377l-.028.152-.532 3.37-.022.108a.15.15 0 0 1-.043.096.144.144 0 0 1-.097.038H7.076Z" />
      </svg>
    ),
  },
  {
    name: "Payoneer",
    percentFee: 2.0,
    fixedFee: 0,
    description: "Comisión por recibir pagos de clientes",
    color: "orange",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Zinli",
    percentFee: 2.9,
    fixedFee: 0.3,
    description: "Billetera digital popular en Venezuela y Latinoamérica",
    color: "violet",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M8 14.5l8-5M8 9.5h8" />
      </svg>
    ),
  },
  {
    name: "Binance Pay",
    percentFee: 0,
    fixedFee: 0,
    description: "Sin comisión entre usuarios Binance. Tasa de conversión puede aplicar.",
    color: "yellow",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2L8.5 5.5 12 9l3.5-3.5L12 2zM5.5 8.5L2 12l3.5 3.5L9 12 5.5 8.5zM18.5 8.5L15 12l3.5 3.5L22 12l-3.5-3.5zM8.5 18.5L12 22l3.5-3.5L12 15l-3.5 3.5zM12 9l-3 3 3 3 3-3-3-3z" />
      </svg>
    ),
  },
  {
    name: "Wise",
    percentFee: 1.5,
    fixedFee: 0.3,
    description: "Comisión promedio para transferencias internacionales en USD",
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

function calcGrossForNet(net: number, percentFee: number, fixedFee: number): number {
  return (net + fixedFee) / (1 - percentFee / 100);
}

const DEFAULT_INPUTS: Inputs = {
  desiredSalary: "40000",
  monthlyExpenses: "500",
  hoursPerWeek: "40",
  weeksPerYear: "48",
  profitMargin: "20",
  taxRate: "15",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function InputField({
  label,
  name,
  value,
  onChange,
  prefix,
  suffix,
  help,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  prefix?: string;
  suffix?: string;
  help?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {prefix}
          </span>
        )}
        <input
          id={name}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`
            w-full rounded-xl border border-gray-700/50 bg-gray-800/50 px-4 py-3 text-white
            placeholder-gray-500 outline-none transition-all duration-200
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
            ${prefix ? "pl-8" : ""}
            ${suffix ? "pr-12" : ""}
          `}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {help && <p className="text-xs text-gray-500">{help}</p>}
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight,
  sub,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  sub?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        highlight
          ? "border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
          : "border-gray-700/50 bg-gray-800/30"
      }`}
    >
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold tracking-tight ${
          highlight ? "text-indigo-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);

  const handleChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const results = useMemo(() => {
    const salary = parseFloat(inputs.desiredSalary) || 0;
    const expenses = parseFloat(inputs.monthlyExpenses) || 0;
    const hoursWeek = parseFloat(inputs.hoursPerWeek) || 1;
    const weeksYear = parseFloat(inputs.weeksPerYear) || 1;
    const margin = parseFloat(inputs.profitMargin) || 0;
    const tax = parseFloat(inputs.taxRate) || 0;

    const annualExpenses = expenses * 12;
    const totalAnnualCost = salary + annualExpenses;
    const billableHours = hoursWeek * weeksYear;
    const baseRate = totalAnnualCost / billableHours;
    const rateWithMargin = baseRate * (1 + margin / 100);
    const hourlyRate = rateWithMargin / (1 - tax / 100);

    const dailyRate = hourlyRate * (hoursWeek / 5);
    const weeklyRate = hourlyRate * hoursWeek;
    const monthlyRate = (hourlyRate * billableHours) / 12;
    const annualRevenue = hourlyRate * billableHours;

    return {
      hourlyRate,
      dailyRate,
      weeklyRate,
      monthlyRate,
      annualRevenue,
      billableHours,
      totalAnnualCost,
      annualExpenses,
    };
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400 mb-6">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
              />
            </svg>
            Herramienta para Freelancers
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Calculadora de{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Tarifa por Hora
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Determina cuánto cobrar por hora para alcanzar tus metas
            financieras como freelancer.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Input Panel */}
          <div className="lg:col-span-3 space-y-8">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-bold">
                  1
                </span>
                Ingresos y Gastos
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Salario anual deseado"
                  name="desiredSalary"
                  value={inputs.desiredSalary}
                  onChange={handleChange}
                  prefix="$"
                  help="Lo que quieres ganar al año (neto)"
                />
                <InputField
                  label="Gastos mensuales del negocio"
                  name="monthlyExpenses"
                  value={inputs.monthlyExpenses}
                  onChange={handleChange}
                  prefix="$"
                  help="Software, equipo, coworking, etc."
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-bold">
                  2
                </span>
                Tiempo de Trabajo
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Horas facturables por semana"
                  name="hoursPerWeek"
                  value={inputs.hoursPerWeek}
                  onChange={handleChange}
                  suffix="hrs"
                  help="Horas realmente productivas"
                />
                <InputField
                  label="Semanas de trabajo al año"
                  name="weeksPerYear"
                  value={inputs.weeksPerYear}
                  onChange={handleChange}
                  suffix="sem"
                  help="Descontando vacaciones y festivos"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-bold">
                  3
                </span>
                Ajustes Financieros
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Margen de beneficio"
                  name="profitMargin"
                  value={inputs.profitMargin}
                  onChange={handleChange}
                  suffix="%"
                  help="Ahorro, inversión y crecimiento"
                />
                <InputField
                  label="Tasa de impuestos"
                  name="taxRate"
                  value={inputs.taxRate}
                  onChange={handleChange}
                  suffix="%"
                  help="Porcentaje estimado de impuestos"
                />
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-5">
                  Tu Tarifa Recomendada
                </h2>

                <div className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 text-center">
                  <p className="text-sm text-indigo-300 mb-1">Por Hora</p>
                  <p className="text-5xl font-extrabold tracking-tight text-white">
                    {formatCurrency(results.hourlyRate)}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {results.billableHours.toLocaleString("es-ES")} hrs
                    facturables/año
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ResultCard
                    label="Por Día"
                    value={formatCurrency(results.dailyRate)}
                    sub="~8 hrs/día"
                  />
                  <ResultCard
                    label="Por Semana"
                    value={formatCurrency(results.weeklyRate)}
                  />
                  <ResultCard
                    label="Por Mes"
                    value={formatCurrency(results.monthlyRate)}
                  />
                  <ResultCard
                    label="Ingreso Anual"
                    value={formatCurrency(results.annualRevenue)}
                    highlight
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Desglose Anual
                </h2>
                <div className="space-y-3">
                  <BreakdownRow
                    label="Salario deseado"
                    value={formatCurrency(
                      parseFloat(inputs.desiredSalary) || 0
                    )}
                  />
                  <BreakdownRow
                    label="Gastos del negocio"
                    value={formatCurrency(results.annualExpenses)}
                  />
                  <div className="border-t border-gray-800 pt-3">
                    <BreakdownRow
                      label="Costo total anual"
                      value={formatCurrency(results.totalAnnualCost)}
                      bold
                    />
                  </div>
                  <BreakdownRow
                    label={`+ Margen (${inputs.profitMargin}%)`}
                    value={formatCurrency(
                      results.totalAnnualCost *
                        (parseFloat(inputs.profitMargin) / 100)
                    )}
                    accent
                  />
                  <BreakdownRow
                    label={`+ Impuestos (${inputs.taxRate}%)`}
                    value={formatCurrency(
                      results.annualRevenue - results.totalAnnualCost * (1 + parseFloat(inputs.profitMargin) / 100)
                    )}
                    accent
                  />
                  <div className="border-t border-gray-800 pt-3">
                    <BreakdownRow
                      label="Facturación anual necesaria"
                      value={formatCurrency(results.annualRevenue)}
                      bold
                      highlight
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Platforms Section */}
        <section className="mt-12">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Ajuste por Plataforma de Pago
                </h2>
                <p className="text-sm text-gray-400">
                  Cuánto cobrarle al cliente para que recibas exactamente tu tarifa neta
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {PLATFORMS.map((platform) => {
                const grossHourly = calcGrossForNet(results.hourlyRate, platform.percentFee, platform.fixedFee);
                const commission = grossHourly - results.hourlyRate;
                const grossDaily = calcGrossForNet(results.dailyRate, platform.percentFee, platform.fixedFee);
                const grossMonthly = calcGrossForNet(results.monthlyRate, platform.percentFee, platform.fixedFee);

                const colorMap: Record<string, { border: string; bg: string; text: string; badge: string; accent: string }> = {
                  blue: {
                    border: "border-blue-500/30",
                    bg: "bg-blue-500/5",
                    text: "text-blue-400",
                    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    accent: "from-blue-500/10 to-blue-600/5",
                  },
                  orange: {
                    border: "border-orange-500/30",
                    bg: "bg-orange-500/5",
                    text: "text-orange-400",
                    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                    accent: "from-orange-500/10 to-orange-600/5",
                  },
                  violet: {
                    border: "border-violet-500/30",
                    bg: "bg-violet-500/5",
                    text: "text-violet-400",
                    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
                    accent: "from-violet-500/10 to-violet-600/5",
                  },
                  green: {
                    border: "border-emerald-500/30",
                    bg: "bg-emerald-500/5",
                    text: "text-emerald-400",
                    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    accent: "from-emerald-500/10 to-emerald-600/5",
                  },
                  yellow: {
                    border: "border-yellow-500/30",
                    bg: "bg-yellow-500/5",
                    text: "text-yellow-400",
                    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                    accent: "from-yellow-500/10 to-yellow-600/5",
                  },
                };

                const colors = colorMap[platform.color] || colorMap.blue;

                return (
                  <div
                    key={platform.name}
                    className={`rounded-2xl border ${colors.border} ${colors.bg} p-5 transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={colors.text}>{platform.icon}</span>
                        <span className="font-semibold text-white">{platform.name}</span>
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}>
                        {platform.percentFee}%{platform.fixedFee > 0 ? ` + $${platform.fixedFee}` : ""}
                      </span>
                    </div>

                    <div className={`rounded-xl bg-gradient-to-br ${colors.accent} border ${colors.border} p-4 mb-4 text-center`}>
                      <p className="text-xs text-gray-400 mb-1">Cobrar al cliente</p>
                      <p className="text-3xl font-extrabold text-white tracking-tight">
                        {formatCurrency(grossHourly)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">/hora</p>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Comisión/hora</span>
                        <span className={`font-mono font-medium ${colors.text}`}>
                          +{formatCurrency(commission)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Recibes neto</span>
                        <span className="font-mono text-gray-300">
                          {formatCurrency(results.hourlyRate)}
                        </span>
                      </div>
                      <div className="border-t border-gray-700/30 pt-2.5 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cobrar/día</span>
                          <span className="font-mono text-gray-400">
                            {formatCurrency(grossDaily)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cobrar/mes</span>
                          <span className="font-mono text-gray-400">
                            {formatCurrency(grossMonthly)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-gray-600 leading-tight">
                      {platform.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-gray-800/30 border border-gray-700/30 px-4 py-3">
              <svg className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              <p className="text-xs text-gray-400">
                Las comisiones mostradas son las tarifas estándar para pagos internacionales.
                Pueden variar según tu país, volumen de transacciones y tipo de cuenta.
                Verifica las tarifas actuales en cada plataforma.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-gray-600">
          <p>
            Calculadora orientativa. Ajusta los valores según tu situación
            particular.
          </p>
        </footer>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  bold,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span
        className={
          bold
            ? "font-semibold text-white"
            : accent
            ? "text-indigo-400"
            : "text-gray-400"
        }
      >
        {label}
      </span>
      <span
        className={`font-mono ${
          highlight
            ? "text-indigo-400 font-bold"
            : bold
            ? "font-semibold text-white"
            : accent
            ? "text-indigo-400"
            : "text-gray-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
