import { CCol, CCardBody, CCard, CButton, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const Sobes = ({ item, loadSobeses, specialists, loadSpecialists, spec }) => {
    const [selectedSpecialist, setSelectedSpecialist] = useState('');
    const [error, setError] = useState('');

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

    const deleteSobes = () => {
        fetch(`http://localhost:8080/api/sobes/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadSobeses();
        });
    };

    const editSobes = () => {
        fetch(`http://localhost:8080/api/specialist/${selectedSpecialist}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (abilitiesPercents(data.abilities.split(','), item.abilities.split(',')) < 80) {
                    setError('Недостаточно навыков');
                    return;
                } else if (
                    !(
                        Number(data.time_start.split(':').join('')) <= Number(item.time_visit.split(':').join('')) &&
                        Number(data.time_finish.split(':').join('')) >= Number(item.time_visit.split(':').join(''))
                    )
                ) {
                    setError('Время визита не попадает во время приёма');
                    return;
                } else {
                    fetch(`http://localhost:8080/api/specialist_sobeses/${selectedSpecialist}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            if (!!data.find((el) => el.time_visit === item.time_visit)) {
                                setError('Время уже занято');
                                return;
                            }
                            const sobes = {
                                id: item.id,
                                fio: item.fio,
                                time_visit: item.time_visit,
                                abilities: item.abilities,
                                specialist_id: selectedSpecialist,
                            };
                            fetch(`http://localhost:8080/api/sobes`, {
                                method: 'PUT',
                                body: JSON.stringify(sobes),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }).then((result) => {
                                loadSpecialists();
                            });
                        });
                }
            });
    };

    return (
        <CCol xs={4} className="pb-3">
            <CCard>
                <CCardBody>
                    <div>ФИО: {item.fio}</div>
                    <div>Время визита: {item.time_visit}</div>
                    <div>Навыки: {item.abilities}</div>
                    <hr />
                    <CFormSelect
                        label="Куда перенести?"
                        onChange={(e) => {
                            setSelectedSpecialist(e.target.value);
                            setError('');
                        }}>
                        <option value=""> </option>
                        {specialists
                            .filter((el) => el.id !== spec.id)
                            .map((specialist) => {
                                return (
                                    <option key={specialist.id} value={specialist.id}>
                                        {specialist.fio}
                                    </option>
                                );
                            })}
                    </CFormSelect>
                    {!!error && <div className="text-danger">{error}</div>}
                    <CButton className="mt-2 me-2" size="sm" onClick={() => editSobes()}>
                        Перенести
                    </CButton>
                    <CButton className="mt-2" size="sm" color="danger" onClick={() => deleteSobes()}>
                        Удалить
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Sobes;
