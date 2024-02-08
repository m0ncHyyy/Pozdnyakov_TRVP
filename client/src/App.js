import { useState, useEffect } from 'react';
import { CCard, CContainer, CRow, CCol, CCardBody, CCardHeader } from '@coreui/react';
import './App.css';
import CreateSpecialist from './CreateSpecialist';
import Specialist from './Specialist';

const App = () => {
    const [specialists, setSpecialists] = useState([]);

    useEffect(() => {
        loadSpecialists();
    }, []);

    const loadSpecialists = () => {
        fetch('http://localhost:8080/api/specialist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSpecialists(data);
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Специалисты</CCardHeader>
                            <CCardBody>
                                {!!specialists.length &&
                                    specialists.map((item) => {
                                        return (
                                            <Specialist
                                                key={item.id}
                                                loadSpecialists={() => loadSpecialists()}
                                                item={item}
                                                specialists={specialists}
                                            />
                                        );
                                    })}
                                <CreateSpecialist loadSpecialists={() => loadSpecialists()} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default App;
