import React, { useState, useEffect } from 'react';
import { LeadData } from '../types';
import { ROL_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, EMPLOYEES_OPTIONS, BUDGET_OPTIONS, SOURCE_OPTIONS, SERVICE_INTEREST_OPTIONS } from '../constants';

interface LeadFormProps {
  initialData: LeadData;
  onSubmit: (data: LeadData) => void;
  onReset: () => void;
  isScoring: boolean;
}

const TextInput: React.FC<{
    id: keyof LeadData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}> = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral-dark dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
      required
    />
  </div>
);

const DateInput: React.FC<{
    id: keyof LeadData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
    <input
      type="date"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral-dark dark:text-slate-100"
      required
    />
  </div>
);


const SelectInput: React.FC<{
  id: keyof LeadData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}> = ({ id, label, value, onChange, options }) => {
  const isSelected = value !== '0';
  const baseClasses = "block w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-200 ease-in-out";
  
  const stateClasses = isSelected 
    ? "border-green-500 dark:border-green-600 text-neutral-dark dark:text-slate-100 focus:ring-green-500 focus:border-green-500"
    : "border-gray-300 dark:border-slate-600 text-gray-500 dark:text-slate-400 focus:ring-primary focus:border-primary";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${stateClasses}`}
      >
        <option value="0" disabled>Seleccione una opción...</option>
        {options.map(option => (
          <option key={option.value} value={option.value} className="text-neutral-dark dark:text-slate-100 bg-white dark:bg-slate-900">{option.label}</option>
        ))}
      </select>
    </div>
  );
};


const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, onReset, isScoring }) => {
  const [formData, setFormData] = useState<LeadData>({
    ...initialData,
    contactDate: initialData.contactDate || new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    setFormData({
      ...initialData,
      contactDate: initialData.contactDate || new Date().toISOString().split('T')[0],
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleReset = () => {
    setFormData({
        ...initialData,
        contactDate: new Date().toISOString().split('T')[0],
    });
    onReset();
  }
  
  const isSubmitDisabled = isScoring || !formData.firstName.trim() || !formData.lastName.trim() || !formData.contactDate.trim() ||
    Object.entries(formData).some(([key, value]) => {
      if (['firstName', 'lastName', 'needDetails', 'contactDate'].includes(key)) {
        return false;
      }
      return value === '0';
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput id="firstName" label="Nombre" value={formData.firstName} onChange={handleChange} placeholder="Ej: María" />
        <TextInput id="lastName" label="Apellido" value={formData.lastName} onChange={handleChange} placeholder="Ej: González" />
      </div>
      <DateInput id="contactDate" label="Fecha de Contacto" value={formData.contactDate} onChange={handleChange} />
      <SelectInput id="role" label="Rol del contacto" value={formData.role} onChange={handleChange} options={ROL_OPTIONS} />
      <SelectInput id="industry" label="Industria" value={formData.industry} onChange={handleChange} options={INDUSTRY_OPTIONS} />
      <SelectInput id="revenue" label="Facturación anual estimada" value={formData.revenue} onChange={handleChange} options={REVENUE_OPTIONS} />
      <SelectInput id="employees" label="Cantidad de colaboradores" value={formData.employees} onChange={handleChange} options={EMPLOYEES_OPTIONS} />
      <SelectInput id="budget" label="Presupuesto asignado" value={formData.budget} onChange={handleChange} options={BUDGET_OPTIONS} />
      
      <div>
        <label htmlFor="needDetails" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Detalle de la necesidad</label>
        <textarea
          id="needDetails"
          name="needDetails"
          rows={3}
          value={formData.needDetails}
          onChange={handleChange}
          placeholder="Describa brevemente el problema, requerimiento o contexto que motiva el contacto..."
          className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral-dark dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
        />
      </div>

      <SelectInput id="source" label="Origen del lead" value={formData.source} onChange={handleChange} options={SOURCE_OPTIONS} />
      <SelectInput id="serviceInterest" label="Interés por tipo de servicio" value={formData.serviceInterest} onChange={handleChange} options={SERVICE_INTEREST_OPTIONS} />

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-dark-altern focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800"
        >
            {isScoring ? 'Calificando...' : 'Calificar Lead'}
        </button>
        <button
            type="button"
            onClick={handleReset}
            disabled={isScoring}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 dark:focus:ring-offset-slate-800"
        >
            Limpiar
        </button>
      </div>
    </form>
  );
};

export default LeadForm;