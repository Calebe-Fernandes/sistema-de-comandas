import React from "react";
import Chart from 'react-apexcharts';

import "./styles.scss";
import { FlatHeaderComponent } from "../../components";

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
    <>
      <FlatHeaderComponent title="Análise de Vendas"/>
      <div className="analise-vendas-container">
        <div className="analise-vendas-wrapper">
          <Chart options={ProfitOptions} series={ProfitSeries} height={300} />

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
              
      </div>
    </>
  )
}

export default AnaliseVendas;