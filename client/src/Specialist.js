import {
    CCard,
    CCardBody,
    CButton,
    CFormInput,
    CContainer,
    CRow,
    CFormSelect,
    CFormLabel,
    CBadge,
} from '@coreui/react';
import { useState, useEffect } from 'react';
import Sobes from './Sobes';
import CreateSobes from './CreateSobes';

export const MAX_CLIENTS_AMOUNT = 5;

const Specialist = ({ item, loadSpecialists, specialists }) => {
    const [edit, setEdit] = useState(false);
    const [fio, setFio] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [timeStart, setTimeStart] = useState('');
    const [timeFinish, setTimeFinish] = useState('');
    const [sobeses, setSobeses] = useState([]);

    const abilititesOptions = ['Python', 'JavaScript', 'SQL', 'PHP'].filter((el) => !abilities.includes(el));

    useEffect(() => {
        loadSobeses(); // eslint-disable-next-line
    }, [specialists]);

    useEffect(() => {
        setFio(item.fio);
        setAbilities(item.abilities.split(','));
        setTimeStart(item.time_start);
        setTimeFinish(item.time_finish);
    }, [item]);

    const loadSobeses = () => {
        fetch(`http://localhost:8080/api/specialist_sobeses/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSobeses(data);
            });
    };

    const deleteSpecialist = (id) => {
        fetch(`http://localhost:8080/api/specialist/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadSpecialists();
        });
    };

    const editSpecialist = (id) => {
        const data = {
            id: id,
            fio: fio,
            abilities: abilities.join(','),
            time_start: timeStart,
            time_finish: timeFinish,
        };
        fetch(`http://localhost:8080/api/specialist`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadSpecialists();
            setEdit(false);
        });
    };

    return (
        <CCard className="mb-3" key={item.id}>
            <CCardBody>
                <div className="">
                    {!edit ? (
                        <div className="pt-1">
                            <div>ФИО: {item.fio}</div>
                            <div>Навыки: {item.abilities}</div>
                            <div>Время начала: {item.time_start}</div>
                            <div>Время окончания: {item.time_finish}</div>
                        </div>
                    ) : (
                        <div className="d-block">
                            <CFormInput
                                className="pt-1"
                                value={fio}
                                onChange={(e) => setFio(e.target.value)}
                                label="ФИО"
                            />
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
                            <CFormInput
                                className="pt-1"
                                type="time"
                                value={timeStart}
                                onChange={(e) => setTimeStart(e.target.value)}
                                label="Время начала"
                            />
                            <CFormInput
                                className="pt-1"
                                type="time"
                                value={timeFinish}
                                onChange={(e) => setTimeFinish(e.target.value)}
                                label="Время окончания"
                            />
                        </div>
                    )}
                    {!edit ? (
                        <CButton className="mt-2" size="sm" color="warning" onClick={() => setEdit(true)}>
                            Редактировать
                        </CButton>
                    ) : (
                        <CButton className="mt-2" size="sm" color="success" onClick={() => editSpecialist(item.id)}>
                            Сохранить
                        </CButton>
                    )}
                    <CButton size="sm" className="ms-2 mt-2" color="danger" onClick={() => deleteSpecialist(item.id)}>
                        Удалить
                    </CButton>
                </div>
                <hr />
                <CContainer fluid className="p-0 m-0">
                    <CRow>
                        {!!sobeses.length &&
                            sobeses.map((el) => {
                                return (
                                    <Sobes
                                        key={el.id}
                                        item={el}
                                        loadSobeses={() => loadSobeses()}
                                        spec={item}
                                        specialists={specialists}
                                        loadSpecialists={() => loadSpecialists()}
                                    />
                                );
                            })}
                        <CreateSobes
                            specialistId={item.id}
                            loadSobeses={() => loadSobeses()}
                            loadSpecialists={() => loadSpecialists()}
                        />
                    </CRow>
                </CContainer>
            </CCardBody>
        </CCard>
    );
};
export default Specialist;
