import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import CalTable from '../components/calTable';
import NcalTable from '../components/ncalTable';
import { Small } from '../components/small';

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
          <span className="text-green-700">~</span> cal
        </h1>
        <CalTable
          date={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        />
        <h1 className="font-mono text-gray-500 px-3 mt-10">
          <span className="text-green-700">~</span> ncal
        </h1>
        <NcalTable
          date={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        />
        <h1 className="px-3 text-gray-500 mt-8 flex items-baseline font-mono">
          <span className="text-green-700 mr-2">~</span>
          cal
          <form className="ml-2 w-full max-w-sm" onSubmit={onSubmit}>
            <div className="flex items-center border-b-2 border-green-900 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none focus:bg-transparent"
                name="command"
                type="text"
                placeholder="January 1970"
                aria-label="command to be entered as if this were a terminal"
                ref={register({
                  required: 'required',
                  pattern: {
                    // value: /^(january|february|march|april|may|june|july|august|september|october|november|december) (\d{4})$/i,
                    value: new RegExp(
                      `^(${Object.values(Months).join(
                        '|',
                      )}) ((19[789]\\d|[2-9]\\d{3}))$`,
                      'i',
                    ),
                    message:
                      'please use the format <month> <year> like in the placeholder for any date 1970 - 9999',
                  },
                })}
              />

              <button
                className="flex-shrink-0 bg-transparent border-green-600 border-2 hover:border-green-400 text-sm text-green-600 hover:text-green-400 py-2 px-4 rounded tracking-widest"
                type="submit"
              >
                Submit
              </button>
            </div>
            <ErrorMessage errors={errors} name="command" as={Small} />
          </form>
        </h1>
        {date && (
          <div className="mt-10">
            <CalTable date={date} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
