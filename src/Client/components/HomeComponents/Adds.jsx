import React from "react";
import ads from "../utils/utilsads.png"

const Adds = () => {
  return (
    <div className="adds justify-center">
      <div className="adds_posters bg-white w-5/6 h-40 m-auto grid justify-center">
        <table>
          <tr>
            <td>
              <img
                src={ads}
                className="inline h-40 w-[750px]  rounded-lg pr-4"
                alt="" />
            </td>
            {/* <td>
              <div className="inline justify-end">
                <h1 className="inline text-2xl">Adds powered by Google</h1>
              </div>
            </td> */}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Adds;
