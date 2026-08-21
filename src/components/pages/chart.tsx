import { Chart, getColor } from "@/components/ui/chart";
import {
  Wrapper,
  Title,
  Subtitle,
  Menu,
  Preview,
  SectionTitle,
  SectionContent,
  InstallPackage,
  PreviewCode,
} from "@/components/docs";

function ChartPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Chart</Title>
            <Subtitle>
              Beautiful charts. Built using Chartjs. Copy and paste into your
              apps.
            </Subtitle>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <Chart
                      className="max-w-100"
                      config={{
                        type: "bar",
                        data: {
                          labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ],
                          datasets: [
                            {
                              label: "Html Template",
                              maxBarThickness: 12,
                              data: [
                                60, 150, 30, 200, 180, 50, 180, 120, 230, 180,
                                250, 270,
                              ],
                              backgroundColor: () =>
                                getColor("--color-primary", 0.3),
                              borderColor: () => getColor("--color-primary"),
                              borderWidth: 1,
                            },
                          ],
                        },
                        options: {
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              display: false,
                            },
                            y: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<Chart
  className="max-w-100"
  config={{
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Html Template",
          maxBarThickness: 12,
          data: [
            60, 150, 30, 200, 180, 50, 180, 120, 230, 180, 250,
            270,
          ],
          backgroundColor: () => getColor("--color-primary", 0.3),
          borderColor: () => getColor("--color-primary"),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  }}
/>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>Install the following dependencies:</SectionContent>
            <InstallPackage>add chart.js</InstallPackage>
            <SectionContent>
              Copy and paste the following code into your project.
            </SectionContent>
            <PreviewCode title="components/ui/chart.tsx">
              {`
import ChartJs from "chart.js/auto";
import { useRef, useEffect } from "react";

function getColor(name: string, opacity = 1) {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (opacity < 1) {
    return \`color-mix(in oklch, $\{color\} $\{opacity * 100\}%, transparent $\{
      100 - opacity * 100
    \}%)\`;
  }
  return color;
}

function Chart({
  className,
  config,
  ...props
}: React.ComponentProps<"canvas"> & {
  config: ConstructorParameters<typeof ChartJs>[1];
}) {
  const chartRef = useRef<
    HTMLCanvasElement & {
      instance?: {};
    }
  >(null);

  useEffect(() => {
    if (chartRef.current && !chartRef.current.instance) {
      chartRef.current.instance = new ChartJs(chartRef.current, config);
    }
  }, []);

  return <canvas className={className} ref={chartRef} {...props} />;
}

export { Chart, getColor };
              `}
            </PreviewCode>
            <SectionContent>
              Update the import paths to match your project setup.
            </SectionContent>
          </div>
          <div id="usage">
            <SectionTitle>Usage</SectionTitle>
            <PreviewCode>
              {`
import { Chart, getColor } from "@/components/ui/chart";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<Chart
  className="max-w-100"
  config={{
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Html Template",
          maxBarThickness: 12,
          data: [
            60, 150, 30, 200, 180, 50, 180, 120, 230, 180, 250,
            270,
          ],
          backgroundColor: () => getColor("--color-primary", 0.3),
          borderColor: () => getColor("--color-primary"),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  }}
/>
              `}
            </PreviewCode>
          </div>
        </div>
      </Wrapper>
      <Menu>
        <a className="hover:text-foreground py-1" href="#installation">
          Installation
        </a>
        <a className="hover:text-foreground py-1" href="#usage">
          Usage
        </a>
      </Menu>
    </>
  );
}

export { ChartPage };
