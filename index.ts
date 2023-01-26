type regiao = { id: number; sigla: string; nome: string };

interface endpointsInterface {
  readonly ibge: string;
  viacep: string;
}

interface ufInterface {
  readonly id: number;
  readonly sigla: string;
  readonly nome?: string;
  readonly regiao?: regiao;
}

interface cepInfoInterface {
  readonly logradouro: string;
  readonly bairro: string;
  readonly localidade: string;
  readonly uf: string;
  readonly cep?: string;
  readonly complemento?: string;
  readonly ibge?: string;
  readonly gia?: string;
  readonly ddd?: string;
  readonly siafi?: string;
}

const endpoints: endpointsInterface = {
  ibge: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
  viacep: `https://viacep.com.br/ws`,
};

let ufList: () => Promise<void> = async () => {
  const response = await fetch(endpoints.ibge);
  let data = await response.json();
  data = data.map((el: ufInterface) => el.sigla);
  uf(data.sort());
};

ufList();

const rua = document.querySelector("#rua") as HTMLInputElement;
const bairro = document.querySelector("#bairro") as HTMLInputElement;
const cidade = document.querySelector("#cidade") as HTMLInputElement;
const select = document.querySelector("#uf") as HTMLSelectElement;

const uf = (data: Array<string>) => {
  for (const value of data) {
    const option = document.createElement("option") as HTMLOptionElement;
    option.setAttribute("value", value);
    option.textContent = value;
    select?.appendChild(option);
  }
};

const cep = document.querySelector("#cep") as HTMLInputElement;
cep.maxLength = 8;

cep?.addEventListener("keyup", (e) => {
  if (
    cep.value.length === 8 &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight"
  ) {
    cep.blur();
    endpoints.viacep = `https://viacep.com.br/ws/${cep.value}/json`;
    cepInfo();
  }
});

const cepInfo: () => void = async () => {
  const response = await fetch(endpoints.viacep);
  let data: cepInfoInterface = await response.json();
  setInputValues(data);
};

const setInputValues = (data: cepInfoInterface) => {
  rua.value = data.logradouro;
  bairro.value = data.bairro;
  cidade.value = data.localidade;
  select.value = data.uf;
};
