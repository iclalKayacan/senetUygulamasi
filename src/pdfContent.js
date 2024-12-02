import React from "react";

const PDFContent = React.forwardRef(({ formData, setFormData }, ref) => {
  const numberToTurkishWords = (num) => {
    const birler = [
      "",
      "Bir",
      "İki",
      "Üç",
      "Dört",
      "Beş",
      "Altı",
      "Yedi",
      "Sekiz",
      "Dokuz",
    ];
    const onlar = [
      "",
      "On",
      "Yirmi",
      "Otuz",
      "Kırk",
      "Elli",
      "Altmış",
      "Yetmiş",
      "Seksen",
      "Doksan",
    ];

    if (num === 0) return "Sıfır";
    let words = "";

    if (num >= 1000000) {
      words += numberToTurkishWords(Math.floor(num / 1000000)) + " Milyon ";
      num %= 1000000;
    }
    if (num >= 1000) {
      if (Math.floor(num / 1000) === 1) {
        words += "Bin ";
      } else {
        words += numberToTurkishWords(Math.floor(num / 1000)) + " Bin ";
      }
      num %= 1000;
    }
    if (num >= 100) {
      if (Math.floor(num / 100) === 1) {
        words += "Yüz ";
      } else {
        words += birler[Math.floor(num / 100)] + " Yüz ";
      }
      num %= 100;
    }
    if (num >= 10) {
      words += onlar[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      words += birler[num] + " ";
    }

    return words.trim().replace(/\s+/g, " ");
  };

  const fillWithDots = (text) => {
    return `..${text.trim()}..`;
  };

  const fillWithDotsPrice = (text, totalLength) => {
    const trimmedText = text.trim();
    const sideDots = "..";
    const dotsNeeded = totalLength - trimmedText.length - sideDots.length * 2;

    const dots = ".".repeat(Math.max(0, dotsNeeded));
    const halfDots = dots.substring(0, Math.floor(dots.length / 2));
    const remainingDots = dots.substring(halfDots.length);

    return `${sideDots}${halfDots}${trimmedText}${remainingDots}${sideDots}`;
  };

  const formatDateToTurkish = (dateString) => {
    if (!dateString) return "";
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const addMonths = (dateString, months) => {
    let date = new Date(dateString);
    if (isNaN(date)) return dateString;
    date.setMonth(date.getMonth() + months);
    return date;
  };

  let totalAmount = parseFloat(formData.tutar || 0);
  if (isNaN(totalAmount)) totalAmount = 0;

  let senetSayisi = parseInt(formData.senetSayisi, 10);
  if (isNaN(senetSayisi) || senetSayisi <= 0) {
    senetSayisi = 1;
  }

  const perNoteAmount = totalAmount / senetSayisi;
  const perNoteAmountFormatted = perNoteAmount.toFixed(2);

  const perNoteAmountWords = numberToTurkishWords(Math.floor(perNoteAmount));
  const perNoteKurus = Math.round(
    (perNoteAmount - Math.floor(perNoteAmount)) * 100
  );
  const perNoteAmountKurusWords =
    perNoteKurus > 0 ? numberToTurkishWords(perNoteKurus) + " Kuruş" : "";

  const amountText = `${perNoteAmountWords.toUpperCase().replace(/ /g, "")}${
    perNoteKurus > 0
      ? perNoteAmountKurusWords.toUpperCase().replace(/ /g, "")
      : ""
  }`;

  let takipNo = parseInt(formData.takipNo, 10);
  if (isNaN(takipNo) || takipNo <= 0) {
    takipNo = 1;
  }

  const borcluTipi = formData.borcluTipi || "Bireysel";
  const isBireysel = borcluTipi === "Bireysel";
  const mEk = isBireysel ? "m" : "miz";
  const kabulEderimEderiz = isBireysel ? "kabul ederim" : "kabul ederiz";

  const ihtilafYeri = formData.ihtilafYeri || "";

  const senetPerPage = 3;
  const totalPages = Math.ceil(senetSayisi / senetPerPage);

  const senetItems = Array.from({ length: senetSayisi }, (_, index) => {
    const i = index + takipNo;
    const noDisplay = `${i}/${takipNo + senetSayisi - 1}`;

    const odemeTarihiDate = addMonths(formData.odemeTarihi, index);
    const odemeTarihiFormatted = formatDateToTurkish(odemeTarihiDate);

    return (
      <div
        key={i}
        className="border border-gray-300 p-4 bg-white relative mb-4 flex flex-col"
        style={{ height: "85mm", overflow: "hidden" }}
      >
        <div className="flex flex-row">
          {/* Logo alanı */}
          <div className="flex-none w-40">
            <img
              src={`${process.env.PUBLIC_URL}/resim.jpg`}
              alt="Resim"
              className="h-full object-cover"
            />
          </div>
          <div className="flex-grow text-xs">
            <div className="text-center mb-2">
              <div className="flex justify-between gap-4">
                <div className="flex flex-col items-center">
                  <strong className="text-sm">Düzenleme Tarihi:</strong>{" "}
                  <span className="text-sm font-bold">
                    {formatDateToTurkish(formData.duzenlemeTarihi)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-sm">Ödeme Tarihi:</strong>{" "}
                  <span className="text-sm font-bold">
                    {odemeTarihiFormatted}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-sm">Tutar (TL):</strong>{" "}
                  <span className="text-sm font-bold">{`${perNoteAmountFormatted} TL`}</span>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-sm">No:</strong>{" "}
                  <span className="text-sm font-bold">{noDisplay}</span>
                </div>
              </div>
            </div>

            <div className="text-left italic mb-2 px-2">
              <p>
                İşbu emre yazılı senedi{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                  }}
                  className="text-lg"
                >
                  {mEk}
                </span>{" "}
                mukabilinde{" "}
                <strong className="text-xs">
                  {fillWithDots(odemeTarihiFormatted)}
                </strong>{" "}
                tarihinde,{" "}
                <strong className="text-xs">
                  {fillWithDots(formData.alacakliIsim || "")}
                </strong>{" "}
                veya emrine,{" "}
                <strong className="text-xs">
                  {fillWithDots(formData.borcluIsim || "...............")}
                </strong>{" "}
                tarafından, yukarıda yazılı yalnız{" "}
                <strong style={{ whiteSpace: "nowrap" }}>
                  {fillWithDotsPrice(amountText, 50)}
                </strong>{" "}
                Türk Lirası ödeyeceği{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                  }}
                >
                  {mEk}
                </span>{" "}
                bedeli (malen) ahzolunmuştur. İş bu bono vadesinde ödenmediği
                takdirde müteakip bonoların da muacceliyet kesbedeceğini,
                ihtilaf vukuunda <strong>{fillWithDots(ihtilafYeri)}</strong>{" "}
                mahkemelerinin selahiyetini şimdiden {kabulEderimEderiz}.
              </p>
            </div>

            <div className="text-left text-xs mb-2 px-0 flex">
              <div className="flex">
                {/* ÖDEYECEK */}
                <div
                  className="flex-none"
                  style={{
                    width: "16px",
                    flexShrink: 0,
                    transform: "rotate(-90deg)",
                    transformOrigin: "left top",
                    fontSize: "14px",
                    fontWeight: "bold",
                    position: "relative",
                    top: "100px",
                  }}
                >
                  <div style={{ display: "inline-block" }}>
                    ÖDEYECEK
                    <div
                      style={{
                        borderBottom: "1px solid black",
                        width: "100%",
                        marginTop: "8px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* Ödeyecek Bilgileri */}
              <div className="flex-grow ml-4">
                <p>
                  <strong>Adı Soyadı / Ünvanı:</strong>{" "}
                  {fillWithDots(formData.borcluIsim || "")}
                </p>
                <p>
                  <strong>Adres:</strong>{" "}
                  {fillWithDots(formData.borcluAdres || "")}
                </p>
                <p>
                  <strong>T.C. Kimlik No / Vergi No:</strong>{" "}
                  {fillWithDots(formData.borcluTC || "")}
                </p>
                <p>
                  <strong>Tel:</strong> {fillWithDots(formData.borcluTel || "")}
                </p>
                <p>
                  <strong>Kefil Adı Soyadı:</strong>{" "}
                  {fillWithDots(formData.kefilIsim || "")}
                </p>
                <p>
                  <strong>Kefil T.C. Kimlik No:</strong>{" "}
                  {fillWithDots(formData.kefilTC || "")}
                </p>
                <p>
                  <strong>Kefil Tel:</strong>{" "}
                  {fillWithDots(formData.kefilTel || "")}
                </p>
              </div>
              {/* Diğer içerik */}
              <div className="w-1/2 text-right">
                <p>
                  <strong>Düzenleme Yeri:</strong>{" "}
                  {fillWithDots(formData.duzenlemeYeri || "")}
                </p>
                <div className="mt-8">
                  <div className="flex justify-end space-x-8">
                    <div className="text-center">
                      <p className="font-bold"> İmzası</p>
                      <div className="border-t mt-1 w-24 mx-auto"></div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold"> İmzası</p>
                      <div className="border-t mt-1 w-24 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const pages = Array.from({ length: totalPages }, (_, pageIndex) => (
    <div key={pageIndex} className="p-4" style={{ pageBreakAfter: "always" }}>
      {senetItems.slice(
        pageIndex * senetPerPage,
        (pageIndex + 1) * senetPerPage
      )}
    </div>
  ));

  return (
    <div
      ref={ref}
      className="text-gray-800 font-serif"
      style={{ marginLeft: "-10mm", overflow: "hidden" }}
    >
      {pages}
    </div>
  );
});

export default PDFContent;
