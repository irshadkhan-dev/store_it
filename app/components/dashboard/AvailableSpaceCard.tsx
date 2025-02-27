import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  getTotalSpaceUsedPercentage,
  TOTAL_SPACE_AVAILABLE_IN_MB,
} from "@/utils/helperFunc";

const chartConfig = {
  space: {
    label: "Space",
  },
  used: {
    label: "Used",
  },
  left: {
    label: "Left",
  },
} satisfies ChartConfig;

const AvailableSpaceCard = ({ spaceUsed }: { spaceUsed: number }) => {
  const { sizeInMB, percentage } = getTotalSpaceUsedPercentage(spaceUsed);
  return (
    <div className="bg-[#FA7275] rounded-3xl shadow-xl flex items-center">
      <div className="w-[22rem]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={[
                {
                  storage: "used",
                  space: Math.floor(sizeInMB),
                  fill: "#f9fafb",
                },
                {
                  storage: "left",
                  space: Math.floor(TOTAL_SPACE_AVAILABLE_IN_MB - sizeInMB),
                  fill: "#d1d5dc",
                },
              ]}
              dataKey="space"
              nameKey="storage"
              innerRadius={75}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-5xl font-bold"
                          fill="#fff"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          fill="#fff"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AvailableSpaceCard;
