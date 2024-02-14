import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchRegions,
  fetchProvincesByRegionId,
  fetchCitiesByProvinceId,
} from "../redux/actions/locationactions";
import { saveNewConvention } from "../redux/actions/conventionactions";

const ConventionForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    logo: "",
    coverImage: "",
    site: "",
    address: "",
    region: "",
    province: "",
    city: "",
  });
  const regions = useSelector((state) => state.location.regions);
  const provinces = useSelector((state) => state.location.provinces);
  const cities = useSelector((state) => state.location.cities);
  const conventions = useSelector((state) => state.conventions.conventions);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleRegionChange = (e) => {
    const selectedRegionId = e.target.value;
    const selectedRegion = regions.find(
      (region) => region.id === parseInt(selectedRegionId)
    );
    setFormData({
      ...formData,
      region: selectedRegion ? selectedRegion.regionName : "",
    });
    dispatch(fetchProvincesByRegionId(selectedRegionId));
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    const selectedProvince = provinces.find(
      (province) => province.id === parseInt(selectedProvinceId)
    );
    setFormData({
      ...formData,
      province: selectedProvince ? selectedProvince.provinceName : "",
    });
    dispatch(fetchCitiesByProvinceId(selectedProvinceId));
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCity = cities.find(
      (city) => city.id === parseInt(selectedCityId)
    );
    setFormData({
      ...formData,
      city: selectedCity ? selectedCity.cityName : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.title ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.address ||
        !formData.region ||
        !formData.province ||
        !formData.city
      ) {
        setError("I campi sono obbligatori");
        return;
      }

      if (formData.startDate > formData.endDate) {
        setError("La data di inizio deve essere prima della data di fine");
        return;
      }

      const isTitleUnique = conventions.every(
        (convention) => convention.title !== formData.title
      );
      if (!isTitleUnique) {
        setError("Il titolo della convenzione deve essere unico");
        return;
      }

      setError(null);

      await dispatch(saveNewConvention(formData));
      console.log("Convention salvata con successo!");
    } catch (error) {
      console.error("Errore nel salvataggio della convention:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <input
        type="text"
        placeholder="Titolo"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <DatePicker
        selected={formData.startDate}
        onChange={(date) => setFormData({ ...formData, startDate: date })}
        placeholderText="Data di inizio"
      />
      <DatePicker
        selected={formData.endDate}
        onChange={(date) => setFormData({ ...formData, endDate: date })}
        placeholderText="Data di fine"
      />
      <input
        type="text"
        placeholder="Sito"
        value={formData.site}
        onChange={(e) => setFormData({ ...formData, site: e.target.value })}
      />
      <input
        type="text"
        placeholder="Indirizzo"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <select value={formData.region} onChange={handleRegionChange}>
        <option value="">Seleziona Regione</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.regionName}
          </option>
        ))}
      </select>
      <select value={formData.province} onChange={handleProvinceChange}>
        <option value="">Seleziona Provincia</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.provinceName}
          </option>
        ))}
      </select>
      <select value={formData.city} onChange={handleCityChange}>
        <option value="">Seleziona Città</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.cityName}
          </option>
        ))}
      </select>
      <button type="submit">Salva</button>
    </form>
  );
};

export default ConventionForm;
