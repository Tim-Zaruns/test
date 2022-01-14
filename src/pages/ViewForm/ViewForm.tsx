import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/button/Button';

type viewType =
{
  'documentName': string,
  'fields': [
    {
      'id': number,
      'field_seq': number,
      'is_mandatory': number,
      'field_type': number,
      'field_name': string,
      'document_id': number,
      'select_values': null,
    }
  ]
};

const ViewForm = () => {
  const { id } = useParams<string>();
  const [viewData, setViewData] = useState<viewType | undefined>(undefined);
  const navigate = useNavigate();

  if (!id) {
    navigate('../404');
  }

  useEffect(() => {
    axios.get(`/api/v1/document/${id}`, {
      headers: {
        'API-KEY': 'secret-api-key',
      },
    }).then((res) => {
      setViewData(res.data);
    });
  }, []);

  return (
    <div>
      {
        viewData && viewData.fields.map((item) => (
          <div key={item.id}>
            <p>{`field_seq: ${item.field_seq}`}</p>
            <p>{`field_type: ${item.field_type}`}</p>
            <p>{`field_name: ${item.field_name}`}</p>
            <p>{`is_mandatory: ${item.is_mandatory}`}</p>
          </div>
        ))
      }
      <div />
      <div>
        <Button name="Atpakaļ" onClick={() => navigate('/document')} />
      </div>
    </div>
  );
};

export default ViewForm;
