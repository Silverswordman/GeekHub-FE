export const FETCH_REGIONS_SUCCESS = "FETCH_REGIONS_SUCCESS";
export const FETCH_PROVINCES_SUCCESS = "FETCH_PROVINCES_SUCCESS";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";

export const FETCH_REGIONS_FAILURE = "FETCH_REGIONS_FAILURE";
export const FETCH_PROVINCES_FAILURE = "FETCH_PROVINCES_FAILURE";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";

const locationurl = "http://localhost:3003/location";

export const fetchRegionsSuccess = (regions) => ({
  type: FETCH_REGIONS_SUCCESS,
  payload: regions,
});

export const fetchProvincesSuccess = (provinces) => ({
  type: FETCH_PROVINCES_SUCCESS,
  payload: provinces,
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});

export const fetchRegionsFailure = (error) => ({
  type: FETCH_REGIONS_FAILURE,
  payload: error,
});

export const fetchProvincesFailure = (error) => ({
  type: FETCH_PROVINCES_FAILURE,
  payload: error,
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});

export const fetchRegions = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(locationurl + "/regions", {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch regions: ${errorMessage}`);
      }
      const data = await response.json();
      dispatch(fetchRegionsSuccess(data));
    } catch (error) {
      console.error("Error fetching regions:", error);
      dispatch(fetchRegionsFailure(error.message));
    }
  };
};

export const fetchProvincesByRegionId = (regionId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        locationurl + `/regions/${regionId}/provinces`,
        {
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch provinces: ${errorMessage}`);
      }
      const data = await response.json();
      dispatch(fetchProvincesSuccess(data));
    } catch (error) {
      console.error("Error fetching provinces:", error);
      dispatch(fetchProvincesFailure(error.message));
    }
  };
};

export const fetchCitiesByProvinceId = (provinceId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        locationurl + `/provinces/${provinceId}/cities`,
        {
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch cities: ${errorMessage}`);
      }
      const data = await response.json();
      dispatch(fetchCitiesSuccess(data));
    } catch (error) {
      console.error("Error fetching cities:", error);
      dispatch(fetchCitiesFailure(error.message));
    }
  };
};
