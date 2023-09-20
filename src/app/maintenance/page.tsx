"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@/lib/zod";
import { InputFormField } from "@/components/hook-form-fields/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const schema = z.object({
  model: z.enum(["btu", "bts"]),
  ref_temp: z.string(),
  current_temp: z.string(),
});
type FormValues = z.infer<typeof schema>;

export default function BudnyCalibration() {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: { current_temp: "", ref_temp: "", model: "bts" },
    resolver: zodResolver(schema),
  });

  const [ref_temp_str, current_temp_str, model] = watch([
    "ref_temp",
    "current_temp",
    "model",
  ]);
  const ref_temp = Number(ref_temp_str);
  const current_temp = Number(current_temp_str);

  const mapModels: Record<FormValues["model"], React.ReactNode> = {
    bts: (
      <>
        <div className="flex gap-8">
          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-red-500">Temperatura </span>
              padrão BAIXO
              <span> (85ºF)</span>
            </p>

            <TempValue label="Ajuste 1" trimpot="P4" value={ref_temp} />
          </div>

          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-blue-500">Umidade </span>
              padrão BAIXO
              <span> (85ºF)</span>
            </p>

            <TempValue label="Ajuste 1" trimpot="P1" value={ref_temp} />
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-red-500">Temperatura </span>
              padrão ALTO
              <span> (180ºF)</span>
            </p>

            {current_temp < ref_temp ? (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P3"
                  value={ref_temp + (ref_temp - current_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P4" value={ref_temp} />
              </>
            ) : (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P3"
                  value={ref_temp - (current_temp - ref_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P4" value={ref_temp} />
              </>
            )}
          </div>

          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-blue-500">Umidade </span>
              padrão ALTO
              <span> (180ºF)</span>
            </p>

            {current_temp < ref_temp ? (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P2"
                  value={current_temp - (ref_temp - current_temp) * 2}
                />
                <TempValue label="Ajuste 2" trimpot="P1" value={ref_temp} />
              </>
            ) : (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P2"
                  value={current_temp + (current_temp - ref_temp) * 2}
                />
                <TempValue label="Ajuste 2" trimpot="P1" value={ref_temp} />
              </>
            )}
          </div>
        </div>
      </>
    ),
    btu: (
      <>
        <div className="flex gap-8">
          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-red-500">Temperatura </span>
              padrão BAIXO
              <span> (85ºF)</span>
            </p>

            <TempValue label="Ajuste 1" trimpot="P2" value={ref_temp} />
          </div>

          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-blue-500">Umidade </span>
              padrão BAIXO
              <span> (85ºF)</span>
            </p>

            <TempValue label="Ajuste 1" trimpot="P4" value={ref_temp} />
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-red-500">Temperatura </span>
              padrão ALTO
              <span> (180ºF)</span>
            </p>

            {current_temp < ref_temp ? (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P1"
                  value={ref_temp + (ref_temp - current_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P2" value={ref_temp} />
              </>
            ) : (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P1"
                  value={ref_temp - (current_temp - ref_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P2" value={ref_temp} />
              </>
            )}
          </div>

          <div>
            <p className="text-slate-500 font-semibold">
              <span className="font-semibold text-blue-500">Umidade </span>
              padrão ALTO
              <span> (180ºF)</span>
            </p>

            {current_temp < ref_temp ? (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P3"
                  value={ref_temp + (ref_temp - current_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P4" value={ref_temp} />
              </>
            ) : (
              <>
                <TempValue
                  label="Ajuste 1"
                  trimpot="P3"
                  value={ref_temp - (current_temp - ref_temp)}
                />
                <TempValue label="Ajuste 2" trimpot="P4" value={ref_temp} />
              </>
            )}
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="container py-6 flex flex-col items-center justify-between gap-6">
      <h2 className="text-2xl font-bold">Procedimento de calibragem</h2>

      <div className="flex items-center gap-6">
        <InputFormField
          label="Referência"
          name="ref_temp"
          control={control}
          type="number"
          helperText="Valor lido do aparelho padrão em ºF"
        />

        <InputFormField
          label="Atual"
          name="current_temp"
          control={control}
          type="number"
          helperText="Valor lido do aparelho budny em ºF"
        />
      </div>

      <Select
        value={model}
        onValueChange={(val) => setValue("model", val as FormValues["model"])}
      >
        <div>
          <Label>Modelo do aparelho</Label>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Modelo do aparelho" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectItem value="bts">Budny BTS</SelectItem>
          <SelectItem value="btu">Budny BTU</SelectItem>
        </SelectContent>
      </Select>

      <div className="border rounded-md border-gray-300 p-4 space-y-8 max-w-2xl mt-4">
        {mapModels[model]}
      </div>
    </div>
  );
}

function TempValue({
  label,
  trimpot,
  value,
}: {
  label?: string;
  trimpot: string;
  value: number;
}) {
  return (
    <p>
      <span className="font-normal text-slate-500">{label} trimpot </span>
      <span className="font-semibold text-slate-800"> ({trimpot}) </span>
      <span className="font-normal text-slate-500"> em : </span>
      <span className="text-xl font-bold text-slate-700"> {value} </span>
    </p>
  );
}
