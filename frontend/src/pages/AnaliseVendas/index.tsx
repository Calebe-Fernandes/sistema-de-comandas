import React, { useState } from "react";
import Chart from 'react-apexcharts';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import "./styles.scss";
import { FlatHeaderComponent } from "../../components";

import SearchAnalysis from "../../assets/search-analysis.png";
import { api } from "../../services/api";
import { string } from "yargs";

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
  const [ppdYAxis, setPPDYAxis] = useState<any[]>([]);
  const [ppdXAxis, setPPDXAxis] = useState<any[]>([]);
  const [itemSeries, setitemSeries] = useState<any[]>([]);
  const [itemSalesYAxis, setitemSalesYAxis] = useState<any[]>([]);
  const [itemProfitYAxis, setitemProfitYAxis] = useState<any[]>([]);

  async function filterRequest(){
    await api.post('/order/closed',{
      "initialDate": startDate,
      "finalDate": endDate
    })
    .then(response =>{
      var arrangedItems: any = [];
      response.data.itemAxisList.reduce(function (res: any, value: any) {
          if (!res[value.name]) {
              res[value.name] = {
                  sales: 0,
                  prices: 0,
                  name: value.name
              };
              arrangedItems.push(res[value.name])
          }
          res[value.name].sales += value.sales;
          res[value.name].price = value.price;
          return res;
      }, {});
      arrangedItems.sort();
      const dscList = arrangedItems.filter((item: { sales: any; })=> item.sales).sort((prev: { sales: number; }, next: { sales: number; }) => {
        return next.sales - prev.sales;
      });
      const slicedArray = dscList.slice(0,4);
      setitemSeries(slicedArray.map((a: { name: any; }) => a.name));
      setitemSalesYAxis(slicedArray.map((a: { sales: Number; }) => a.sales));

      const ppi = [];
      for(var i=0;i<5;i++){
        try{
          ppi.push(slicedArray[i].price*slicedArray[i].sales);
          console.log(slicedArray[i].price);
          console.log(slicedArray[i].sales);
        }catch{};
      }
      setitemProfitYAxis(ppi);

      var arrangedPPD: any = [];
      response.data.ppdaxisList.reduce(function (res: any, value: any) {
          if (!res[value.date]) {
              res[value.date] = {
                  profit: 0,
                  date: value.date
              };
              arrangedPPD.push(res[value.date])
          }
          res[value.date].profit += value.profit
          return res;
      }, {});
      let yAxis2 = arrangedPPD.map((a: { profit: any; }) => a.profit);
      setPPDYAxis(yAxis2);
      let xAxis2 = arrangedPPD.map((a: { date: any; }) => a.date);
      setPPDXAxis(xAxis2);
    });
  }

  function submitSearch() {
    setSearch(true);
    setSearchBox(false);
    filterRequest();
  }

  const ProfitSeries = [
    {
      name: 'Valor obtido (R$)',
      data: ppdYAxis,
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
      categories: ppdXAxis,
    },
    series: ProfitSeries
  };

  const ProfitByItemSeries = [
    {
      name: 'Valor obtido no item',
      data: itemProfitYAxis,
    },
  ];
  
  const BestSellersSeries = [
    {
      name: 'Unidades vendidas',
      data: itemSalesYAxis,
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
      categories: itemSeries,
    },
    yaxis: [{
      title: {
        text: 'Valor em reais',
      },
    }],
    series: ProfitByItemSeries
  };

  const SalesByItemOptions:ApexOptions = {
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
      categories: itemSeries,
    },
    yaxis: [{
      title: {
        text: 'Baixas no estoque',
      },
    }],
    series: ProfitByItemSeries
  };

  const itensMaisPedidos = itemSeries;
    
  return(
    <>
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
                      onChange={(e) => setStartDate(()=>{let format = e.target.value.split("-"); return format[2]+"/"+format[1]+"/"+format[0]})}
                    />
                  </div>

                  <p>até</p>

                  <div className="form-field">
                    <label htmlFor="">Até</label>
                    <input
                      type="date"
                      defaultValue={endDate}
                      onChange={(e) => setEndDate(()=>{let format = e.target.value.split("-"); return format[2]+"/"+format[1]+"/"+format[0]})}
                    />
                  </div>
                </div>

              <button  className="search-button" disabled={ startDate !== "" && endDate!=="" ? false : true} onClick={submitSearch}>
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
                    <p>Vendas por unidade</p>
                    <Chart type="bar" options={SalesByItemOptions} series={BestSellersSeries} height={250} />
                  </div>
                  <div>
                    <p>Faturamento por item</p>
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
    </>

  )
}

export default AnaliseVendas;