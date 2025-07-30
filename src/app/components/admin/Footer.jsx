"use client";

import React, {useState, useCallback} from "react";
import {FiSettings} from "react-icons/fi";
import {useFormik, getIn} from "formik";
import {footerSchema} from "@/src/app/Schema/footer";
import Input from "@/src/app/components/form/Input";
import {socialMediaIcons, detectSocialMedia} from "@/src/app/utils/socialMediaIcons";
import {IoIosCloseCircleOutline} from "react-icons/io";

const Footer = () => {
    const [linkAddress, setLinkAddress] = useState("");
    const [footerData, setFooterData] = useState({});
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [iconComponent, setIconComponent] = useState(null);
    const [platformName, setPlatformName] = useState("");

    const formik = useFormik({
        initialValues: {
            location: "",
            email: "",
            phoneNumber: "",
            desc: "",
            workingHours: "",
            lastUpdated: new Date().toISOString(),
        },
        validationSchema: footerSchema,
        onSubmit: async (values, actions) => {
            try {
                const formData = {
                    ...values,
                    socialMediaLinks: socialMediaLinks,
                    lastUpdated: new Date().toISOString(),
                };

                console.log("Processed Form Data:", formData);
                alert("Form başarıyla gönderildi!");

                // Clear all states
                setSocialMediaLinks([]);
                setLinkAddress("");
                setIconComponent(null);
                setPlatformName("");
                setFooterData(formData);

                // Reset form
                actions.resetForm({
                    values: {
                        location: "",
                        email: "",
                        phoneNumber: "",
                        desc: "",
                        workingHours: "",
                        lastUpdated: new Date().toISOString(),
                    },
                });
            } catch (error) {
                console.error("Form gönderme hatası:", error);
                alert("Form gönderilirken bir hata oluştu!");
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    const handleLinkChange = useCallback((e) => {
        const url = e.target.value;
        setLinkAddress(url);

        const detected = detectSocialMedia(url);
        if (detected) {
            setIconComponent(() => detected.IconComponent);
            setPlatformName(detected.platform);
        } else {
            setIconComponent(null);
            setPlatformName("");
        }
    }, []);

    const handleAddSocialMedia = useCallback(() => {
        let url = linkAddress.trim();

        if (!url) {
            alert("Lütfen geçerli bir link adresi girin!");
            return;
        }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        const isDuplicate = socialMediaLinks.some((link) => link.link === url);
        if (isDuplicate) {
            alert("Bu link zaten eklenmiş!");
            return;
        }

        const detected = detectSocialMedia(url);

        const newLink = {
            IconComponent: detected?.IconComponent || socialMediaIcons.default,
            link: url,
            platform: detected?.platform || "website",
        };

        setSocialMediaLinks((prev) => [...prev, newLink]);
        setLinkAddress("");
        setIconComponent(null);
        setPlatformName("");
    }, [linkAddress, socialMediaLinks]);

    const handleRemoveSocialMedia = useCallback((index) => {
        setSocialMediaLinks((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = formik;

    const inputs = [
        {id: 1, name: "location", type: "text", placeholder: "Your Location"},
        {id: 2, name: "email", type: "email", placeholder: "Your Email"},
        {id: 3, name: "phoneNumber", type: "tel", placeholder: "Your Phone Number"},
        {id: 4, name: "desc", type: "text", placeholder: "Your Description"},
        {id: 5, name: "workingHours", type: "text", placeholder: "Working Hours (e.g. 9:00 AM - 5:00 PM)"},
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-2">
                    <span
                        className="bg-gray-100 border-2 border-amber-600 p-4 rounded-full flex items-center justify-center">
                        <FiSettings size={32} className="text-amber-600"/>
                    </span>
                    <h3 className="text-4xl font-dancing font-semibold text-amber-600">Footer</h3>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    {inputs.map((input) => {
                        const error = getIn(errors, input.name);
                        const touch = getIn(touched, input.name);

                        return (
                            <div key={input.id}>
                                <Input
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touch && error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-700">Social Media Links</h4>
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex items-center gap-2 w-full flex-1">
                            <Input
                                placeholder="Link Address (örn: https://www.linkedin.com/feed/)"
                                onChange={handleLinkChange}
                                value={linkAddress}
                            />
                            {iconComponent && (
                                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                                    {React.createElement(iconComponent, {size: 20})}
                                    <span className="text-sm capitalize font-medium">{platformName}</span>
                                </div>
                            )}
                            <button
                                className="bg-green-600 text-nowrap text-white hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-200"
                                type="button"
                                onClick={handleAddSocialMedia}
                            >
                                Add Link
                            </button>
                        </div>
                    </div>

                    {socialMediaLinks.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-3">
                            {socialMediaLinks.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border"
                                >
                                    {React.createElement(item.IconComponent, {size: 18})}
                                    <span className="text-sm capitalize max-w-[100px] truncate" title={item.link}>
                                        {item.platform}
                                    </span>
                                    <button
                                        className="text-red-500  hover:text-red-700 ml-2"
                                        onClick={() => handleRemoveSocialMedia(index)}
                                        type="button"
                                        title="Remove link"
                                    >
                                        <IoIosCloseCircleOutline size={20}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {values.lastUpdated && `Last updated: ${new Date(values.lastUpdated).toLocaleString()}`}
                    </div>
                    <button
                        className={`px-6 py-2 rounded-xl text-white ${
                            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"
                        }`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Updating..." : "Update Footer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Footer;