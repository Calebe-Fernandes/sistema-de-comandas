import React, { useState } from "react";
import Chart from 'react-apexcharts';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import "./styles.scss";
import { FlatHeaderComponent } from "../../components";

import SearchAnalysis from "../../assets/search-analysis.png";

export interface ApexOptions {
  annotations?: ApexAnnotations;
  chart?: ApexChart;
  colors?: any[];
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  forecastDataPoints?: ApexForecastDataPoints;
  grid?: ApexGrid;
  labels?: string[];
  legend?: ApexLegend;
  markers?: ApexMarkers;
  noData?: ApexNoData;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  states?: ApexStates;
  stroke?: ApexStroke;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
}

const AnaliseVendas: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [searchBox, setSearchBox] = useState<boolean>(true);

  function submitSearch() {
    setSearch(true);
    setSearchBox(false);
    console.log(search, searchBox)
  }

  const ProfitSeries = [
    {
      name: 'Valor obtido (R$)',
      data: [2000, 2500, 2320, 3187, 3000, 2147, 2698],
    },
  ];

  const ProfitOptions:ApexOptions = {
    chart: {
      width: '100%',
      type: 'line',
      fontFamily: 'Montserrat, sans-serif',
      zoom: {

        enabled: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Faturamento por dia',
      align: 'center',
    },
    grid: {

      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        '01/01/2023',
        '02/01/2023',
        '03/01/2023',
        '04/01/2023',
        '05/01/2023',
        '06/01/2023',
        '07/01/2023',
      ],
    },
    series: ProfitSeries
  };

  const ProfitByItemSeries = [
    {
      name: 'Valor obtido no item',
      data: [8420, 5041, 4521, 3575, 3159],
    },
  ];

  const ProfitByItemOptions:ApexOptions = {
    plotOptions: {
      bar: {
        distributed: true,
      }
    },
    chart: {
      width: "100%",
      fontFamily: 'Montserrat, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [
        'Porção Batata Frita (G)',
        'Coca Cola 2L',
        'Porção Calabresa (M)',
        'Guaraná 1L',
        'X-Salada',
      ],
    },
    yaxis: [{
      title: {
        text: 'Valor em reais',
      },
    }],
    series: ProfitByItemSeries
  };

  const itensMaisPedidos = [
    'Porção Batata Frita (G)',
    'Coca Cola 2L',
    'Porção Calabresa (M)',
    'Guaraná 1L',
    'X-Salada',
  ];
    
  return(
    <div className="analise-vendas-page">
      <FlatHeaderComponent title="Análise de Vendas"/>

      <div className="analise-vendas-wrapper">
        {
          (search==false || searchBox==true) &&
          <div className="search-box-container">
            <div className={search ? "box-header-close" : "box-header"}>
              <p>Selecione um intervalo de data para realizar a análise</p>

              {
                search ?
                <button className="close" onClick={() => setSearchBox(false)}>
                  <FontAwesomeIcon icon={faXmark} className="icon-close-modal" />
                </button>
                :
                <></>
              }
            </div>

            <div className="box-content">
              <div className="data-range-inputs">
                <p>De</p>

                <div className="form-field">
                  <label htmlFor="">De</label>
                  <input
                    type="date"
                    defaultValue={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <p>até</p>

                <div className="form-field">
                  <label htmlFor="">Até</label>
                  <input
                    type="date"
                    defaultValue={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

            <button  className="search-button" onClick={submitSearch}>
              Buscar
              <FontAwesomeIcon icon={faSearch} />
            </button>
            </div>
          </div>
        }

        {
          !searchBox &&
          <div className="date-container" onClick={() => setSearchBox(true)}>
            <p>{startDate}   -   {endDate}</p>
            
            <FontAwesomeIcon icon={faCalendar} />
          </div>
        }

        {
          search ?
          <div className="charts-container">
            <div>
              <Chart options={ProfitOptions} series={ProfitSeries} height={300} />
            </div>

            <div className="grid-right">
              <h4>Itens mais pedidos</h4>

              <div>
                {
                  itensMaisPedidos.map((item, index) => {
                    return (
                      <p className="most-ordered-item">
                        <span>{ index + 1 }°</span>
                        { item }
                      </p>
                    )
                  })
                }
              </div>

              <div className="most-ordered-charts">
                <div>
                  <p>Faturamento por itens mais pedidos</p>
                  <Chart type="bar" options={ProfitByItemOptions} series={ProfitByItemSeries} height={250} />
                </div>
                <div>
                  <p>Faturamento por itens mais pedidos</p>
                  <Chart type="bar" options={ProfitByItemOptions} series={ProfitByItemSeries} height={250} />
                </div>
              </div>
            </div>
          </div>
          :
          <div className="busca-nao-realizada">
            <p>Busque um intervalo de data para visualizar a análise de vendas no período.</p>
          
            <div className="search-analysis-image">
              <img src={SearchAnalysis} alt="" />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default AnaliseVendas;