import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRegions,
  fetchProvincesByRegionId,
  fetchCitiesByProvinceId,
} from "../redux/actions/locationactions";
import { getConventionDetail } from "../redux/actions/conventionactions";

import { updateConvention } from "../redux/actions/update&deleteactions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

const UpdateConventionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conventionId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    site: "",
    address: "",
    region: "",
    province: "",
    city: "",
  });
  const regions = useSelector((state) => state.location.regions);
  const provinces = useSelector((state) => state.location.provinces);
  const cities = useSelector((state) => state.location.cities);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(getConventionDetail(conventionId));
  }, [dispatch, conventionId]);

  const conventionDetail = useSelector(
    (state) => state.conventionDetails.conventionDetail
  );

  useEffect(() => {
    if (conventionDetail && Object.keys(conventionDetail).length > 0) {
      const {
        title,
        startDate,
        endDate,
        site,
        address,
        region,
        province,
        city,
      } = conventionDetail;
      setFormData({
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        site,
        address,
        region: region.regionName,
        province: province.provinceName,
        city: city.cityName,
      });
    }
  }, [conventionDetail]);

  useEffect(() => {
    if (formData.region) {
      const selectedRegionId = regions.find(
        (region) => region.regionName === formData.region
      )?.id;
      if (selectedRegionId) {
        dispatch(fetchProvincesByRegionId(selectedRegionId));
      }
    }
  }, [formData.region, dispatch, regions]);

  useEffect(() => {
    if (formData.province) {
      const selectedProvinceId = provinces.find(
        (province) => province.provinceName === formData.province
      )?.id;
      if (selectedProvinceId) {
        dispatch(fetchCitiesByProvinceId(selectedProvinceId));
      }
    }
  }, [formData.province, dispatch, provinces]);

  const handleRegionChange = (e) => {
    const selectedRegionName = e.target.value;
    setFormData({
      ...formData,
      region: selectedRegionName,
      province: "",
      city: "",
    });
    const selectedRegionId = regions.find(
      (region) => region.regionName === selectedRegionName
    )?.id;
    if (selectedRegionId) {
      dispatch(fetchProvincesByRegionId(selectedRegionId));
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceName = e.target.value;
    setFormData({
      ...formData,
      province: selectedProvinceName,
      city: "",
    });
    const selectedProvinceId = provinces.find(
      (province) => province.provinceName === selectedProvinceName
    )?.id;
    if (selectedProvinceId) {
      dispatch(fetchCitiesByProvinceId(selectedProvinceId));
    }
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    setFormData({
      ...formData,
      city: selectedCityName,
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

      setError(null);

      await dispatch(updateConvention(conventionId, formData));

      console.log("Convenzione aggiornata con successo!");

      navigate("/home");
    } catch (error) {
      console.error("Errore nell'aggiornamento della convenzione:", error);
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col className="col-11 col-md-8">
        <Card className="p-4 bg-primary-subtle border border-4 border-info">
          <Row>
            <Col className="col-6">
              <Form onSubmit={handleSubmit}>
                {error && <div>{error}</div>}
                <Form.Group controlId="title">
                  <Form.Label className="fw-bolder">
                    Inserisci qui una nuova fiera/evento!
                  </Form.Label>
                  <Form.Control
                    className="my-1"
                    type="text"
                    placeholder="Inserisci qui il nome della tua fiera/evento!"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="startDate">
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) =>
                      setFormData({ ...formData, startDate: date })
                    }
                    placeholderText="Data di inizio"
                    className="my-1 border-0 rounded-pill"
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Group>
                <Form.Group controlId="endDate">
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date) =>
                      setFormData({ ...formData, endDate: date })
                    }
                    placeholderText="Data di fine"
                    className="my-1 border-0 rounded-pill"
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Group>
                <Form.Group controlId="site">
                  <Form.Control
                    type="text"
                    placeholder="Sito"
                    value={formData.site}
                    onChange={(e) =>
                      setFormData({ ...formData, site: e.target.value })
                    }
                    className="my-1"
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Control
                    type="text"
                    placeholder="Indirizzo"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="my-1"
                  />
                </Form.Group>
                <Form.Group controlId="region">
                  <Form.Control
                    className="my-1"
                    as="select"
                    value={formData.region}
                    onChange={handleRegionChange}
                  >
                    <option value="">Seleziona Regione</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.regionName}>
                        {region.regionName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="province">
                  <Form.Control
                    className="my-1"
                    as="select"
                    value={formData.province}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Seleziona Provincia</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.provinceName}>
                        {province.provinceName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Control
                    className="my-1"
                    as="select"
                    value={formData.city}
                    onChange={handleCityChange}
                  >
                    <option value="">Seleziona Città</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button
                  type="submit"
                  className="bg-info text-primary fw-bolder border border-3 border-primary-subtle mt-3 hover-scale"
                >
                  Salva
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateConventionForm;
