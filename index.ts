const rua = document.querySelector("#rua") as HTMLInputElement;
const bairro = document.querySelector("#bairro") as HTMLInputElement;
const cidade = document.querySelector("#cidade") as HTMLInputElement;
const numero = document.querySelector("#numero") as HTMLInputElement;
const selectUf = document.querySelector("#uf") as HTMLSelectElement;
const cep = document.querySelector("#cep") as HTMLInputElement;

cep.maxLength = 8;

type regiao = { id: number; sigla: string; nome: string };

interface endpoints {
    readonly ibge: string;
    viacep: string;
}

interface apiFullfilledIbge {
    readonly id: regiao["id"];
    readonly sigla: regiao["sigla"];
    readonly nome?: regiao["nome"];
    readonly regiao?: regiao;
}

interface apiFullfilledViaCep {
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

const endpoints: endpoints = {
    ibge: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
    viacep: `https://viacep.com.br/ws`,
};

let apiGetUfData = async () => {
    const response = await fetch(endpoints.ibge);
    let data = await response.json();
    data = data.map((el: apiFullfilledIbge) => el.sigla);
    setUfOption(data.sort());
};
apiGetUfData();

const setUfOption = (data: Array<string>): void => {
    for (const value of data) {
        const option = document.createElement("option") as HTMLOptionElement;
        option.setAttribute("value", value);
        option.textContent = value;
        selectUf?.appendChild(option);
    }
};
cep?.addEventListener("keyup", (e) => {
    if (
        cep.value.length === 8 &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight"
    ) {
        const apiGetCepData = async () => {
            endpoints.viacep = `https://viacep.com.br/ws/${cep.value}/json`;
            const response = await fetch(endpoints.viacep);
            let data: apiFullfilledViaCep = await response.json();
            setInputValues(data);
        };
        apiGetCepData();
    } else {
        const clearInput = (): void => {
            rua.value = "";
            bairro.value = "";
            cidade.value = "";
            selectUf.value = "AC";
        }
        clearInput();
    }
});

const setInputValues = (data: apiFullfilledViaCep): void => {
    rua.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    selectUf.value = data.uf;
    numero.focus();
};
