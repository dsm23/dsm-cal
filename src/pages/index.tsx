import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import CalTable from '../components/calTable';
import NcalTable from '../components/ncalTable';

import { Months } from '../types';
import { capitaliseFirstLetter } from '../utils/index';

interface FormData {
  command: string;
}

interface DateArgs {
  month: Months;
  year: ReturnType<Date['getFullYear']>;
}

const IndexPage: FunctionComponent = () => {
  const [date, setDate] = useState<Date>();

  const handleDate = ({ month, year }: DateArgs) =>
    setDate(new Date(year, Object.values(Months).indexOf(month) + 1, 0));

  const today = new Date();

  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ command }: FormData) => {
    const [month, year] = command.split(' ');

    return handleDate({
      month: capitaliseFirstLetter(month),
      year: Number(year),
    });
  });

  return (
    <Layout>
      <SEO title="Home" />
      <div className="font-mono text-white max-w-md">
        <h1 className="font-mono text-gray-500 px-3">
          <span className="text-green-900">~</span> cal
        </h1>
        <CalTable
          date={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        />
        <h1 className="font-mono text-gray-500 px-3 mt-10">
          <span className="text-green-900">~</span> ncal
        </h1>
        <NcalTable
          date={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        />
        <h1 className="px-3 text-gray-500 mt-8 flex items-baseline font-mono">
          <span className="text-green-900 mr-2">~</span>
          cal
          <form className="ml-2 w-full max-w-sm" onSubmit={onSubmit}>
            <div className="flex items-center border-b-2 border-green-900 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
                name="command"
                type="text"
                placeholder="June 2020"
                aria-label="command to be entered as if this were a terminal"
                ref={register}
              />
              <button
                className="flex-shrink-0 border-green-900 border-2 hover:border-green-700 text-sm text-green-900 hover:text-green-700 py-2 px-4 rounded tracking-widest"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </h1>
        {date && <CalTable date={date} />}
      </div>
    </Layout>
  );
};

export default IndexPage;
