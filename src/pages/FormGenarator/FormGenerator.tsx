import React, { FormEvent, useEffect, useState } from 'react';
import './formGenerator.scss';
import axios from 'axios';
import Button from '../../components/button/Button';

type FormDataType = {
  'document_name': string,
  'form_values': [
    {
      'field_seq': number,
      'is_mandatory': boolean,
      'field_type': number,
      'field_name': string,
      'select_values'?: string | null
    },
    ]
}

const FormGenerator = () => {
  const [inputName, setInputName] = useState('');
  const [fieldSeq, setFieldSeq] = useState(0);
  const [fieldType, setFieldType] = useState('1');
  const [formData, setFormData] = useState<FormDataType>();
  const [checkboxValue, setCheckBox] = useState(false);
  const [inputDocumentField, setInputDocumentField] = useState('');
  const [textArea, setTextArea] = useState<string>('');

  const SubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      document_name: inputDocumentField,
      form_values: [
        {
          field_seq: fieldSeq,
          is_mandatory: checkboxValue,
          field_type: Number(fieldType),
          field_name: inputName,
          select_values: textArea || null,
        },
      ],
    });
  };
  useEffect(() => {
    if (formData) {
      const toJson = JSON.stringify(formData);
      setTimeout(() => {
        axios.post(
          '/api/v1/documents/create',
          { data: toJson },
          {
            headers: {
              'API-KEY': 'secret-api-key',
            },
          },
        ).then((res) => console.log(res)).catch((reason) => console.log(reason));
      }, 2000);
    }
  }, [SubmitHandler]);
  return (
    <div>
      <input
        type="text"
        value={inputDocumentField}
        onChange={(e) => setInputDocumentField(e.target.value)}
        placeholder="Document name"
      />
      <form className="form" onSubmit={SubmitHandler}>
        <label htmlFor="name" className="form__label">
          Nosaukums
          <input
            type="text"
            name="name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </label>
        <label htmlFor="fieldSeq" className="form__label">
          Secība
          <input
            type="number"
            name="fieldSeq"
            value={fieldSeq}
            onChange={(e) => setFieldSeq(e.target.valueAsNumber)}
          />
        </label>
        <label htmlFor="fieldType" className="form__label">
          Tips
          <select
            name="fieldType"
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
          >
            <option value="1">Input</option>
            <option value="2">Select</option>
            <option value="3">Number input</option>
          </select>
        </label>
        {
          fieldType === '2'
          && (
            <textarea
              cols={80}
              rows={10}
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
          )
        }
        <label htmlFor="required">
          Obligāts
          <input
            name="required"
            type="checkbox"
            checked={checkboxValue}
            onChange={(e) => setCheckBox(e.target.checked)}
          />
        </label>
        <Button name="Saglabāt" onClick={() => null} />
      </form>
    </div>
  );
};

export default FormGenerator;
