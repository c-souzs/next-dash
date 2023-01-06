import { User } from "phosphor-react";

import { UserContentModal } from "../../types/user";
import HeaderModal from "../elements/Modal/Header";
import EmployeeRead from "../form/employee/Read";
import EmployeeWrite from "../form/employee/Write";

const ContentModalEmployee = ({type, employeeSelect}: UserContentModal) => {
    return (
        <>
            <HeaderModal 
                    icon={User}
                    title="Informações do funcionário"
            />
            {type === "view" && <EmployeeRead employeeSelect={employeeSelect}/>}
            {type === "update" && <EmployeeWrite type={type} employeeSelect={employeeSelect}/>}
            {type === "register" && <EmployeeWrite type={type} />}
        </>
    )
}

export default ContentModalEmployee;