import { getSectionDetail } from './conventionactions';
import { getConventionDetail } from './conventionactions';


export const UPLOAD_SECTION_IMAGE_REQUEST = "UPLOAD_SECTION_IMAGE_REQUEST";
export const UPLOAD_SECTION_IMAGE_SUCCESS = "UPLOAD_SECTION_IMAGE_SUCCESS";
export const UPLOAD_SECTION_IMAGE_FAILURE = "UPLOAD_SECTION_IMAGE_FAILURE";

const urlconventions = "http://localhost:3003/conventions";

export const uploadSectionImageRequest = () => ({
  type: UPLOAD_SECTION_IMAGE_REQUEST,
});

export const uploadSectionImageSuccess = (imageUrl) => ({
  type: UPLOAD_SECTION_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const uploadSectionImageFailure = (error) => ({
  type: UPLOAD_SECTION_IMAGE_FAILURE,
  payload: error,
});

export const uploadSectionImage = (conventionId, sectionId, file) => {
  return async (dispatch) => {
    dispatch(uploadSectionImageRequest());

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}/uploadImage`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Errore durante il caricamento dell'immagine della sezione"
        );
      }

      const imageUrl = await response.text();

      dispatch(uploadSectionImageSuccess(imageUrl));
      dispatch(getSectionDetail(conventionId, sectionId));
    } catch (error) {
      dispatch(uploadSectionImageFailure(error.message));
    }
  };
};
export const UPLOAD_CONVENTION_LOGO_REQUEST = "UPLOAD_CONVENTION_LOGO_REQUEST";
export const UPLOAD_CONVENTION_LOGO_SUCCESS = "UPLOAD_CONVENTION_LOGO_SUCCESS";
export const UPLOAD_CONVENTION_LOGO_FAILURE = "UPLOAD_CONVENTION_LOGO_FAILURE";

export const uploadConventionLogoRequest = () => ({
  type: UPLOAD_CONVENTION_LOGO_REQUEST,
});

export const uploadConventionLogoSuccess = (imageUrl) => ({
  type: UPLOAD_CONVENTION_LOGO_SUCCESS,
  payload: imageUrl,
});

export const uploadConventionLogoFailure = (error) => ({
  type: UPLOAD_CONVENTION_LOGO_FAILURE,
  payload: error,
});

export const uploadConventionLogo = (file, conventionId) => {
  return async (dispatch) => {
    dispatch(uploadConventionLogoRequest());

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${urlconventions}/${conventionId}/uploadLogo`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante il caricamento del logo della fiera");
      }

      // Ottieni direttamente l'URL dell'immagine dalla risposta
      const imageUrl = await response.text();

      dispatch(uploadConventionLogoSuccess(imageUrl));
      dispatch(getConventionDetail(conventionId));
    } catch (error) {
      dispatch(uploadConventionLogoFailure(error.message));
    }
  };
};

export const UPLOAD_CONVENTION_COVER_REQUEST =
  "UPLOAD_CONVENTION_COVER_REQUEST";
export const UPLOAD_CONVENTION_COVER_SUCCESS =
  "UPLOAD_CONVENTION_COVER_SUCCESS";
export const UPLOAD_CONVENTION_COVER_FAILURE =
  "UPLOAD_CONVENTION_COVER_FAILURE";

export const uploadConventionCoverRequest = () => ({
  type: UPLOAD_CONVENTION_COVER_REQUEST,
});

export const uploadConventionCoverSuccess = (imageUrl) => ({
  type: UPLOAD_CONVENTION_COVER_SUCCESS,
  payload: imageUrl,
});

export const uploadConventionCoverFailure = (error) => ({
  type: UPLOAD_CONVENTION_COVER_FAILURE,
  payload: error,
});

export const uploadConventionCover = (file, conventionId) => {
  return async (dispatch) => {
    dispatch(uploadConventionCoverRequest());

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${urlconventions}/${conventionId}/uploadCover`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Errore durante il caricamento della copertina della fiera"
        );
      }

      const imageUrl = await response.text();

      dispatch(uploadConventionCoverSuccess(imageUrl));
      dispatch(getConventionDetail(conventionId));
    } catch (error) {
      dispatch(uploadConventionCoverFailure(error.message));
    }
  };
};
