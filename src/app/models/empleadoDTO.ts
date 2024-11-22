export interface EmpleadoDTO {
  nombre: string;
  edad: number;
  fechaAlta: string | null;
  fechaBaja: string | null;
  salario: number;
  departamentoTO: {
    id: number;
  };
}