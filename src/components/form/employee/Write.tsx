import { User } from "@prisma/client";
import React, { FormEvent } from "react";
import { EmployeeCtx } from "../../../contexts/Employee";
import { GlobalCtx } from "../../../contexts/Global";
import useInput from "../../../hooks/useInput";
import { UserApi, UserContentModal } from "../../../types/user";
import { api } from "../../../utils/api";
import { formatEua } from "../../../utils/formatDate";
import { colorsFem, colorsMasc, fakeProps, optionsSex } from "../../../utils/global";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

const EmployeeWrite = ({type, employeeSelect}: UserContentModal) => {
    const { value: valueName, setValue: setName, ...restName } = useInput({type: null});
    const { value: valueEmail, setValue: setEmail, ...restEmail } = useInput({type: "email"});
    const { value: valueAddress, setValue: setAddress, ...restAddress } = useInput({type: null});

    const { positions } = React.useContext(GlobalCtx);
    const {  setNotify, setShowModal, setRefresh } = React.useContext(GlobalCtx);
    const positionsSelect = positions.map(({id, name}) => ({id, value: name}));

    const [officeSelectId, setOfficeSelectId] = React.useState('0');
    const [salaray, setSalary] = React.useState('');
    const [date, setDate] = React.useState('');
    const [sexSelectId, setSexSelectId] = React.useState('0');

    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        if(officeSelectId === "0") return;

        const dataOfficeSelect = positions.filter(({id}) => id === Number(officeSelectId));
        
        setSalary(dataOfficeSelect[0].salary.toString());
    }, [officeSelectId]);

    React.useEffect(() => {
        const date = new Date();
        const dateInput = formatEua(date);
        setDate(dateInput);
        
        if(type !== "update" || !employeeSelect) return;
        const { address, name, officeId, register, sex, login } = employeeSelect;
        const { email } = login!;
    
        const dateFormat = formatEua(new Date(register));
        const sexId = sex ? '1' : '2';
        const officeIdFormat = officeId.toString();

        setName(name);
        setAddress(address);
        setEmail(email);
        setDate(dateFormat);
        setSexSelectId(sexId);
        setOfficeSelectId(officeIdFormat);
    }, []);

    const handleSubmitEmployeeWrite = async(e: FormEvent) => {
        e.preventDefault();

        const colorsImage = sexSelectId === "1" ? colorsMasc.join(",") as string : colorsFem.join(",") as string;
        const dataEmployee = {
            name: valueName, 
            email: valueEmail,
            address: valueAddress,
            image: `https://source.boringavatars.com/beam/120/${valueEmail}?colors=${colorsImage}`, 
            sex: sexSelectId === '1' || false,
            officeId: Number(officeSelectId),
        }

        try {
            if(type == "update" && employeeSelect){
                const { id } = employeeSelect;
                await api.put<{data: User}, typeof dataEmployee>(`user/${id}`, dataEmployee);
            } else {
                await api.post<{data: UserApi}, typeof dataEmployee>("user", dataEmployee);
            }

            setNotify({
                show: true,
                type: "success"
            });
        } catch (error) {
            setNotify({
                show: true,
                type: "failure"
            });
        } finally {
            setLoading(false);
        }
        
        setShowModal(false);
        setRefresh(true);
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmitEmployeeWrite}>
            <div className="flex gap-4">
                <Select label="Cargo" setValue={setOfficeSelectId} value={officeSelectId} options={positionsSelect}/>
                <Select label="Sexo" setValue={setSexSelectId} value={sexSelectId} options={optionsSex}/>
            </div>
            <div className="flex gap-4">
                <Input label="Nome" value={valueName} setValue={setName} {...restName} placeholder={'Nome completo'}/>
                <Input label="Endereço" value={valueAddress} setValue={setAddress} {...restAddress} placeholder={'Sua Rua - Número - Cidade-estado'}/>
            </div>
            <Input label="Email" value={valueEmail} setValue={setEmail} {...restEmail} placeholder={'seuemail@gmail.com'}/>
            <div className="flex gap-4">
                {salaray !== "" && <Input label="Salário" value={salaray} {...fakeProps}/>}
                <Input label="Data da contratação" type="date" value={date} {...fakeProps} />
            </div>
            <Button disabled={loading}> Contratar </Button>
        </form>
    )
}

export default EmployeeWrite;