import clsx from "clsx";

interface Stat {
  id: number;
  name: string;
  value: string;
}

interface StatisticsProps {
  stats: Stat[];
  className?:string
}

const Statistics: React.FC<StatisticsProps> = ({ stats,className }) => {
  return (
    <div className={clsx("hidden lg:flex py-12 sm:py-18 invert px-4",className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="lg:grid gap-x-8 gap-y-16 text-center lg:grid-cols-4 ">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Statistics;
