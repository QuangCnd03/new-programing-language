import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const usePageTitle = (title) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(".", { state: { pageTitle: title } });
    }, [navigate, title]);
};
export const useInputNumberInt = () => {
    return useCallback((e) => {
        const input = e.target;
        input.value = input.value.replace(/[^\d]/g, '');
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    }, []);
};

export const handleSlug = (title) => {
    let slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");

    return slug;
};
export const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}
export const handleErrorMsg = (errors) => {
    if(errors == null) {
        return "";
    };
    let errorMessage = "";
    Object.entries(errors).forEach(([index, message]) => {
        errorMessage += message + "\n";
      })
    return errorMessage;
}
export const getTimeDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds - mins * 60);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${formattedMins}:${formattedSecs}`;
};