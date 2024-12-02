import React, { useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import { generatePDF } from "./pdfGenerator";
import PDFContent from "./pdfContent";

function App() {
  const [formData, setFormData] = useState({
    duzenlemeTarihi: "",
    odemeTarihi: "",
    tutar: "",
    takipNo: "",
    duzenlemeYeri: "Kaşide Yeri",
    odemeYeri: "Konya",
    borcluIsim: "",
    borcluAdres: "",
    borcluTC: "",
    borcluTel: "",
    kefilIsim: "",
    kefilAdres: "",
    kefilTC: "",
    kefilTel: "",
    senetSayisi: "1",
    borcluTipi: "Bireysel",
    ihtilafYeri: "",
    alacakliIsim: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const pdfRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(pdfRef);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-6 px-8">
          <h2 className="text-3xl font-bold">
            Senet Oluşturma Formu YANAL MÜHENDİSLİK
          </h2>
          <p className="mt-2 text-base">Lütfen aşağıdaki formu doldurun.</p>
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-8">
          {/* Senet Bilgileri */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              <span className="border-l-4 border-blue-600 pl-2">
                Senet Bilgileri
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">
                  Düzenleme Tarihi
                </label>
                <input
                  type="date"
                  name="duzenlemeTarihi"
                  value={formData.duzenlemeTarihi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  Düzenleme Yeri
                </label>
                <input
                  type="text"
                  name="duzenlemeYeri"
                  value={formData.duzenlemeYeri}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Ödeme Tarihi</label>
                <input
                  type="date"
                  name="odemeTarihi"
                  value={formData.odemeTarihi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Ödeme Yeri</label>
                <input
                  type="text"
                  name="odemeYeri"
                  value={formData.odemeYeri}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Tutar (TL)</label>
                <input
                  type="number"
                  name="tutar"
                  value={formData.tutar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Senet No</label>
                <input
                  type="text"
                  name="takipNo"
                  value={formData.takipNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Senet Sayısı</label>
                <input
                  type="number"
                  name="senetSayisi"
                  value={formData.senetSayisi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Alacaklı Bilgileri */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              <span className="border-l-4 border-blue-600 pl-2">
                Alacaklı Bilgileri
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">
                  Alacaklı Adı Soyadı
                </label>
                <input
                  type="text"
                  name="alacakliIsim"
                  value={formData.alacakliIsim}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              {/* Gerekirse daha fazla alan ekleyebilirsiniz */}
            </div>
          </div>

          {/* Borçlu Bilgileri */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              <span className="border-l-4 border-blue-600 pl-2">
                Borçlu Bilgileri
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Borçlu Tipi</label>
                <select
                  name="borcluTipi"
                  value={formData.borcluTipi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded bg-white"
                >
                  <option value="Bireysel">Bireysel</option>
                  <option value="Kurumsal">Kurumsal</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  Adı Soyadı / Ünvanı
                </label>
                <input
                  type="text"
                  name="borcluIsim"
                  value={formData.borcluIsim}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-2">Adres</label>
                <textarea
                  name="borcluAdres"
                  value={formData.borcluAdres}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded resize-none"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  T.C. Kimlik No / Vergi No
                </label>
                <input
                  type="text"
                  name="borcluTC"
                  value={formData.borcluTC}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                  maxLength="11"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="borcluTel"
                  value={formData.borcluTel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  maxLength="15"
                />
              </div>
            </div>
          </div>

          {/* Kefil Bilgileri */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              <span className="border-l-4 border-blue-600 pl-2">
                Kefil Bilgileri (Varsa)
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Adı Soyadı</label>
                <input
                  type="text"
                  name="kefilIsim"
                  value={formData.kefilIsim}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  T.C. Kimlik No
                </label>
                <input
                  type="text"
                  name="kefilTC"
                  value={formData.kefilTC}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  maxLength="11"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-2">Adres</label>
                <textarea
                  name="kefilAdres"
                  value={formData.kefilAdres}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded resize-none"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="kefilTel"
                  value={formData.kefilTel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  maxLength="15"
                />
              </div>
            </div>
          </div>

          {/* İhtilaf Yeri */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              <span className="border-l-4 border-blue-600 pl-2">
                İhtilaf Yeri (Mahkeme)
              </span>
            </h3>
            <div>
              <label className="block text-gray-600 mb-2">İhtilaf Yeri</label>
              <input
                type="text"
                name="ihtilafYeri"
                value={formData.ihtilafYeri}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Senet Oluştur
            </button>
            <button
              type="button"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Önizlemeyi Kapat" : "Önizle"}
            </button>
          </div>
        </form>
      </div>

      {/* Önizleme alanı */}
      {showPreview && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
            Önizleme
          </h2>
          <PDFContent
            ref={pdfRef}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}

      {/* PDF içeriği */}
      <div className="hidden">
        <PDFContent
          ref={pdfRef}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default App;
