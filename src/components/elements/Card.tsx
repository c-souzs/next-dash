import { Activity } from "phosphor-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { blueGraphic, multipleColorsGraphic } from "../../utils/graphic";

const settingsOptionsGraphic = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}

const settingsOptionsGraphicPie = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true
        }
    }
}

type CardProps = {
    type: 'line' | 'bar' | 'pie';
    title: string;
    value: string;
    labelGraphic: string;
    labelDescription: string[];
    dataGraphic: number[];
};

const Card = ({ type, title, value, labelGraphic, labelDescription, dataGraphic }: CardProps) => {
    const structureDataGraphic = {
        labels: labelDescription,
        datasets: [
            {
                label: labelGraphic,
                data: dataGraphic
            }
        ]
    }

    const ref = structureDataGraphic.datasets[0];
    if(type === 'pie') structureDataGraphic.datasets[0] = {
            ...ref,
            ...multipleColorsGraphic
        }
    else structureDataGraphic.datasets[0] = {
            ...ref,
            ...blueGraphic
        }
        
    return (
        <div className='border border-black-700 rounded p-4'>
            <div className='flex justify-between mb-4'>
                <div>
                    <span className='block text-white-500'>{ title }</span>
                    <strong className='block text-lg font-semibold text-white-50'>{ value }</strong>
                </div>
                <div>
                    <span className='inline-block p-1 text-black-900 font-semibold bg-green-500 rounded'>
                        <Activity size={24}/>
                    </span>
                </div>
            </div>
            <div className='h-[150px]'>
                {type === 'line' && <Line data={structureDataGraphic} options={settingsOptionsGraphic}/>}
                {type === 'bar' && <Bar data={structureDataGraphic} options={settingsOptionsGraphic} /> }
                {type === 'pie' && <Pie data={structureDataGraphic} options={settingsOptionsGraphicPie} />}
            </div>
        </div>
    )
}

export default Card;