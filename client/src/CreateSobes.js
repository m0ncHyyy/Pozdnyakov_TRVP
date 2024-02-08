import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CFormLabel,
    CBadge,
} from '@coreui/react';
import { useState } from 'react';

const CreateSobes = ({ specialistId, loadSobeses }) => {
    const [fio, setFio] = useState('');
    const [timeVisit, setTimeVisit] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [error, setError] = useState('');
    const abilititesOptions = ['Python', 'JavaScript', 'SQL', 'PHP'].filter((el) => !abilities.includes(el));

    const abilitiesPercents = (arr1, arr2) => {
        let count = 0;
        for (let index = 0; index < arr2.length; index++) {
            const element = arr2[index];
            if (arr1.includes(element)) {
                count = count + 1;
            }
        }
        console.log(count, arr1.length);
        return (count / arr1.length) * 100;
    };

    const createSobes = () => {
        fetch(`http://localhost:8080/api/specialist/${specialistId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (abilitiesPercents(data.abilities.split(','), abilities) < 80) {
                    setError('Недостаточно навыков');
                    return;
                } else if (
                    !(
                        Number(data.time_start.split(':').join('')) <= Number(timeVisit.split(':').join('')) &&
                        Number(data.time_finish.split(':').join('')) >= Number(timeVisit.split(':').join(''))
                    )
                ) {
                    setError('Время визита не попадает во время приёма');
                    return;
                } else {
                    fetch(`http://localhost:8080/api/specialist_sobeses/${specialistId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            if (!!data.find((el) => el.time_visit === timeVisit)) {
                                setError('Время уже занято');
                                return;
                            }
                            const sob = {
                                fio: fio,
                                time_visit: timeVisit,
                                abilities: abilities.join(','),
                                specialist_id: specialistId,
                            };
                            fetch('http://localhost:8080/api/sobes', {
                                method: 'POST',
                                body: JSON.stringify(sob),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }).then((result) => {
                                loadSobeses();
                            });
                            setFio('');
                            setTimeVisit('');
                            setAbilities([]);
                        });
                }
            });
    };

    return (
        <CCol xs={4}>
            <CCard>
                <CCardHeader>Создание собеседования</CCardHeader>
                <CCardBody>
                    <CFormLabel>ФИО</CFormLabel>
                    <CFormInput
                        value={fio}
                        onChange={(e) => {
                            setError('');
                            setFio(e.target.value);
                        }}
                    />
                    <CFormLabel className="mt-2">Время визита</CFormLabel>
                    <CFormInput
                        type="time"
                        value={timeVisit}
                        onChange={(e) => {
                            setError('');
                            setTimeVisit(e.target.value);
                        }}
                    />
                    <CFormLabel className="mt-2">Навыки</CFormLabel>
                    <CFormSelect
                        value={1}
                        onChange={(e) => {
                            setError('');
                            setAbilities(() => [...abilities, e.target.value]);
                        }}>
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
                    {!!error && <div className="text-danger">{error}</div>}
                    <CButton className="text-center" size="sm" onClick={createSobes}>
                        Создать
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default CreateSobes;
