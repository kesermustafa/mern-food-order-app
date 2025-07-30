import * as Yup from "yup";

export const footerSchema = Yup.object().shape({
    location: Yup.string().required("Konum zorunludur"),
    email: Yup.string().email("Geçerli bir e-posta girin").required("E-posta zorunludur"),
    phoneNumber: Yup.string().required("Telefon numarası zorunludur"),
    desc: Yup.string().required("Açıklama zorunludur"),
    workingHours: Yup.string()
        .required("Çalışma saatleri zorunludur")
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s*(AM|PM)?\s*-\s*([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s*(AM|PM)?$/,
            "Geçerli saat formatı girin (Ör: 9:00 AM - 5:00 PM)"
        ),
    lastUpdated: Yup.date().default(() => new Date()),
    socialMediaLinks: Yup.array().of(
        Yup.object().shape({
            link: Yup.string().url("Geçerli bir URL girin").required("Link zorunludur"),
            platform: Yup.string().required(),
            IconComponent: Yup.mixed().required()
        })
    )
});