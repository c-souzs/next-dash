import React from "react";

import {  UserContentModal } from "../../../types/user";
import { formatEua } from "../../../utils/formatDate";
import { fakeProps } from "../../../utils/global";
import Input from "../Input";
import Select from "../Select";

type EmployeeReadProps = Pick<UserContentModal, 'employeeSelect'>;

const EmployeeRead = ({employeeSelect}: EmployeeReadProps) => {
    
    if(!employeeSelect) return null;
    const { address, name: nameEmployee, register, login, office: { salary, name }, sex, officeId } = employeeSelect;
    const { email } = login!;

    const optionOffice = [{id: officeId, value: name}];
    const optionSex = [{id: 1, value: sex ? 'Masculino' : 'Feminino'}];
    const dateFormat = formatEua(new Date(register));
    
    return (
        <form className="flex flex-col gap-4" >
            <div className="flex gap-4">
                <Select label="Cargo" value={officeId.toString()} setValue={() => {}} options={optionOffice}/>
                <Select label="Sexo" value={'1'} setValue={() => {}} options={optionSex}/>
            </div>
            <div className="flex gap-4">
                <Input label="Nome" value={nameEmployee} {...fakeProps} placeholder={'Nome completo'}/>
                <Input label="Endereço" value={address} {...fakeProps} placeholder={'Sua Rua - Número - Cidade-estado'}/>
            </div>
            <Input label="Email" value={email}  {...fakeProps} placeholder={'seuemail@gmail.com'}/>
            <div className="flex gap-4">
                <Input label="Salário" value={salary.toString()} {...fakeProps}/>
                <Input label="Data da contratação" type="date" value={dateFormat} {...fakeProps} />
            </div>
        </form>
    )
}

export default EmployeeRead;