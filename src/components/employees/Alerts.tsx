import React from "react";
import { EmployeeCtx } from "../../contexts/Employee";
import { SaleCtx } from "../../contexts/Sale";
import { SaleAlerts } from "../../types/sale";
import { UserAlerts } from "../../types/user";
import { formatBr } from "../../utils/formatDate";
import Alert from "../elements/Alert";

type AlertsEmployeesProps = {
    data: UserAlerts;
}

const AlertsEmployees = ({data}: AlertsEmployeesProps) => {
    const {alerts: alertsCtx, setAlerts } = React.useContext(EmployeeCtx);
    const { frist, second, third } = data;

    React.useEffect(() => setAlerts({frist, second, third}), []);
    const { frist: f, second: s, third: t } = alertsCtx;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-white-50 mb-3">Avisos ⚠️</h3>
            <div className="grid grid-cols-3 gap-6">
                <Alert title={`${f.name} - 🥇`} text={`Esse funionários realizou ${f.amount} vendas.`}  />
                <Alert title={`${s.name} - 🥈`} text={`Esse funionários realizou ${s.amount} vendas.`}  />
                <Alert title={`${t.name} - 🥉`} text={`Esse funionários realizou ${t.amount} vendas.`}  />
            </div>
        </div>
    )
}

export default AlertsEmployees;