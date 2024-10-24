import { Card, CardBody, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SearchCard({ title, overview, img, type, id }) {
  try {
    return type == "movie" ? (
      <Link to={`/detail/${id}`}>
        <Card className="bg-slate-950">
          <CardBody className="flex space-x-6 flex-row px-5">
            <div className="flex items-center">
              <Image className="w-[80px] h-[100px]" src={img} />
            </div>
            <div className="flex flex-col w-fit">
              <h3 className="font-bold text-xl line-clamp-1">{title}</h3>
              <p className="text-sm line-clamp-3">{overview}</p>
            </div>
          </CardBody>
        </Card>
      </Link>
    ) : (
      <Link to={`/tvdetail/${id}`}>
        <Card className="bg-slate-950">
          <CardBody className="flex space-x-6 flex-row px-5">
            <div className="flex items-center">
              <Image className="w-[80px] h-[100px]" src={img} />
            </div>
            <div className="flex flex-col w-fit">
              <h3 className="font-bold text-xl line-clamp-1">{title}</h3>
              <p className="text-sm line-clamp-3">{overview}</p>
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  } catch (error) {
    console.log(error);
  }
}
