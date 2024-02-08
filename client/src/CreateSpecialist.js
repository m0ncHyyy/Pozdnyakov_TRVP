import { useState } from 'react';
import { CCard, CCardBody, CFormInput, CButton, CCardHeader, CFormSelect, CFormLabel, CBadge } from '@coreui/react';

const CreateSpecialist = ({ loadSpecialists }) => {
    const [fio, setFio] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [timeStart, setTimeStart] = useState('');
    const [timeFinish, setTimeFinish] = useState('');

    const abilititesOptions = ['Python', 'JavaScript', 'SQL', 'PHP'].filter((el) => !abilities.includes(el));

    const createSpecialist = () => {
        const data = {
            fio: fio,
            abilities: abilities.join(','),
            time_start: timeStart,
            time_finish: timeFinish,
        };
        fetch('http://localhost:8080/api/specialist', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadSpecialists();
        });
        setFio('');
        setAbilities([]);
        setTimeStart('');
        setTimeFinish('');
    };

    return (
        <CCard>
            <CCardHeader>Создание специалиста</CCardHeader>
            <CCardBody>
                <CFormLabel>ФИО</CFormLabel>
                <CFormInput value={fio} onChange={(e) => setFio(e.target.value)} />
                <CFormLabel className="mt-2">Навыки</CFormLabel>
                <CFormSelect
                    value={1}
                    placeholder="Профиль"
                    onChange={(e) => setAbilities(() => [...abilities, e.target.value])}>
                    <option value={1}></option>
                    {abilititesOptions.map((item) => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </CFormSelect>
                <div className="pt-2">
                    {abilities.map((ab) => {
                        return (
                            <CBadge
                                key={ab}
                                className="m-1"
                                color="secondary"
                                onClick={() => setAbilities(abilities.filter((el) => el !== ab))}>
                                {ab}
                            </CBadge>
                        );
                    })}
                </div>
                <CFormLabel className="mt-2">Время начала</CFormLabel>
                <CFormInput type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
                <CFormLabel className="mt-2">Время окончания</CFormLabel>
                <CFormInput type="time" value={timeFinish} onChange={(e) => setTimeFinish(e.target.value)} />
                <CButton className="mt-3" onClick={createSpecialist}>
                    Создать
                </CButton>
            </CCardBody>
        </CCard>
    );
};

export default CreateSpecialist;
