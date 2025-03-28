import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

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
export const useStudentProfile = () => {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
          axios.get("/profile").then((response) => {
              setProfile(response.data.student);
            });
        }
      }, []);
    return profile;
}
export const getTimeDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds - mins * 60);
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  return `${formattedMins}:${formattedSecs}`;
};
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}