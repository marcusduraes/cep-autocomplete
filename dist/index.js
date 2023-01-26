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
const endpoints = {
    ibge: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
    viacep: `https://viacep.com.br/ws`,
};
let ufList = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(endpoints.ibge);
    let data = yield response.json();
    data = data.map((el) => el.sigla);
    uf(data.sort());
});
ufList();
const rua = document.querySelector("#rua");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const numero = document.querySelector("#numero");
const select = document.querySelector("#uf");
const uf = (data) => {
    for (const value of data) {
        const option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        select === null || select === void 0 ? void 0 : select.appendChild(option);
    }
};
const cep = document.querySelector("#cep");
cep.maxLength = 8;
cep === null || cep === void 0 ? void 0 : cep.addEventListener("keyup", (e) => {
    if (cep.value.length === 8 &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight") {
        numero.focus();
        endpoints.viacep = `https://viacep.com.br/ws/${cep.value}/json`;
        cepInfo();
    }
});
const cepInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(endpoints.viacep);
    let data = yield response.json();
    setInputValues(data);
});
const setInputValues = (data) => {
    rua.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    select.value = data.uf;
};
