"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rua = document.querySelector("#rua");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const numero = document.querySelector("#numero");
const selectUf = document.querySelector("#uf");
const cep = document.querySelector("#cep");
cep.maxLength = 8;
const endpoints = {
    ibge: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
    viacep: `https://viacep.com.br/ws`,
};
let apiGetUfData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(endpoints.ibge);
    let data = yield response.json();
    data = data.map((el) => el.sigla);
    setUfOption(data.sort());
});
apiGetUfData();
const setUfOption = (data) => {
    for (const value of data) {
        const option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        selectUf === null || selectUf === void 0 ? void 0 : selectUf.appendChild(option);
    }
};
cep === null || cep === void 0 ? void 0 : cep.addEventListener("keyup", (e) => {
    if (cep.value.length === 8 &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight") {
        const apiGetCepData = () => __awaiter(void 0, void 0, void 0, function* () {
            endpoints.viacep = `https://viacep.com.br/ws/${cep.value}/json`;
            const response = yield fetch(endpoints.viacep);
            let data = yield response.json();
            setInputValues(data);
        });
        apiGetCepData();
    }
    else {
        const clearInput = () => {
            rua.value = "";
            bairro.value = "";
            cidade.value = "";
            selectUf.value = "AC";
        };
        clearInput();
    }
});
const setInputValues = (data) => {
    rua.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    selectUf.value = data.uf;
    numero.focus();
};
