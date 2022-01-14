import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './document.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

axios.defaults.baseURL = 'https://dev1.esynergy.lv';

type DocumentType = {
  'id': number,
  'document_name': string,
  'created_at': string,
  'field_count': number,
}

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-us', {
  year: 'numeric', month: 'numeric', day: 'numeric',
});

const Document = () => {
  const [DocumentData, setDocumentData] = useState<DocumentType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/documents', {
      headers: {
        'API-KEY': 'secret-api-key',
      },
    }).then((res) => {
      setDocumentData(res.data);
    });
  }, []);

  const toViewForm = (id: number) => {
    navigate(`/document/${id}`);
  };

  const clickHandler = () => {
    navigate('/form-generation');
  };
  return (
    <div className="table__wrapper">
      <div>
        <Button name="Izveidot jaunu dokumentu formu" onClick={clickHandler} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Dokumenta nosaukums</th>
            <th>Izveidošanas datums</th>
            <th>Dokumenta lielums</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          {
        DocumentData.map(({
          id, document_name, created_at, field_count,
        }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{document_name}</td>
            <td>{formatDate(created_at)}</td>
            <td>{field_count}</td>
            <td onClick={() => toViewForm(id)} style={{ cursor: 'pointer' }}>
              Atvērt priekšskatu
            </td>
          </tr>
        ))
      }
        </tbody>
      </table>
    </div>
  );
};

export default Document;
