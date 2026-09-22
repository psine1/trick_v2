'use client';

import React from 'react';
import { useRef, useState } from 'react';
import styles from './ContactForm.module.css';
import SvgStrokeInput from '../SvgStrokeInput/SvgStrokeInput';
import SvgStrokeMessage from '../SvgStrokeMessage/SvgStrokeMessage';
import SvgStrokeButtonForm from '../SvgStrokeButtonForm/SvgStrokeButtonForm';
import useMediaQuery from '@/hooks/useMediaQuery';

import { sendEmailContact } from '@/services/nordemailer';

const ContactForm = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', email: '', phone: '', message: '', file: '' });
  const fileInputRef = useRef(null);
  const fileLabelRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!validateEmail(data.email)) {
      setIsButtonDisabled(false);
      alert('ingresa un email válido');
      return;
    }

    if (!validatePhone(data.phone)) {
      setIsButtonDisabled(false);
      alert('ingresa un teléfono válido');
      return;
    }
    const result = await sendEmailContact({ email: data.email, phone: data.phone, subject: data.subject, message: data.message, file: await filesBase64(data.file) });
    console.log("Result: ", result);
    if (result?.accepted?.length > 0) {
      setForm({ name: '', subject: '', email: '', phone: '', message: '', file: '' });
      if (fileLabelRef.current) {
        fileLabelRef.current.textContent = 'File';
      }
    }
    setIsButtonDisabled(false)
  };

  const filesBase64 = async (file) => {
    if (!(file instanceof File) || file.size === 0) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // validar num telefonos 
    const re = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;
    return re.test(phone);
  };

  const onFileSelected = (evt) => {
    const files = Array.from(evt.target.files ?? []);
    const selectedFile = files[0] ?? '';
    setForm((currentForm) => ({ ...currentForm, file: selectedFile }));

    if (fileLabelRef.current) {
      fileLabelRef.current.textContent = selectedFile ? selectedFile.name : 'File';
    }
  }


  return (
    <div className="mx-auto p-4 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputShadow} absolute`}>
              <SvgStrokeInput />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`${styles.pathInput} p-2 py-4 block w-full focus:outline-none`}
              placeholder="What’s your name?"
              required
            />
            <SvgStrokeInput />
          </div>

          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputShadow} absolute`}>
              <SvgStrokeInput />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`${styles.pathInput} p-2 py-4 block w-full focus:outline-none`}
              placeholder="Your email address"
              required
            />
            <SvgStrokeInput />
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputShadow} absolute`}>
              <SvgStrokeInput />
            </div>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={`${styles.pathInput} p-2 py-4 block w-full focus:outline-none`}
              placeholder="Subject"
              required
            />
            <SvgStrokeInput />
          </div>
          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputShadow} absolute`}>
              <SvgStrokeInput />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`${styles.pathInput} p-2 py-4 block w-full focus:outline-none`}
              placeholder="Your telephone number"
              required
            />
            <SvgStrokeInput />
          </div>
        </div>
        {/* Row 3 */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4  ">
          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputFileShadow} absolute`}>
              {isMobile ? <SvgStrokeInput /> : <SvgStrokeButtonForm />}
            </div>
            <div className={`${styles.pathInputFile}`}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`relative ${styles.mainButton}`}
              >
                Select file
              </button>
              <span ref={fileLabelRef} className={`${styles.pathSpanFile}`}>
                File
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              name="file"
              onChange={onFileSelected}
              style={{ height: '58px', backgroundColor: "#FFF", display: 'none' }}
              className={`${styles.pathInputFile} p-2 py-6 block w-full focus:outline-none`}
              placeholder="File"
              accept=".doc,.pdf,.docx"
            />

            {isMobile ? <SvgStrokeInput /> : <SvgStrokeButtonForm />}
          </div>

        </div>
        { /*<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4  ">
          <div className={`relative flex-1`}>
            <div className={`${styles.pathInputFileShadow} absolute`}>
              {isMobile ? <SvgStrokeInput /> : <SvgStrokeButtonForm />}
            </div>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setForm({ ...form, file: e })}
              style={{ height: '58px', backgroundColor: "#FFF" }}
              className={`${styles.pathInputFile} p-2 py-6 block w-full focus:outline-none`}
              placeholder="File"
              accept=".doc,.pdf,.docx"
            />
            {isMobile ? <SvgStrokeInput /> : <SvgStrokeButtonForm />}
          </div>

        </div>*/}
        {/* Row 4 */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className={`relative flex-1`}>
            <div className={`${styles.pathMessageShadow} absolute`}>
              <SvgStrokeMessage />
            </div>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="5"
              className={`${styles.pathMessage}  p-2 py-4 min-h-48 md:min-h-72 block w-full rounded-md shadow-sm focus:outline-none`}
              placeholder="Your message"
              required
            />
            <SvgStrokeMessage />
          </div>
        </div>
        {/* Row 5 */}
        <div className="relative flex" >
          <div className={`${styles.pathButtonShadow} absolute`}>
            {isMobile ? <SvgStrokeInput /> : <SvgStrokeButtonForm />}
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`${styles.pathButton} px-6 py-3 w-full bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
