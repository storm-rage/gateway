/*
 * @Author: chenmeifeng
 * @Date: 2025-07-31 17:30:24
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-28 10:01:49
 * @Description:
 */
import "./point-left.less"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Button, Checkbox, Pagination } from "antd"
import PiontContext from "../configs/use-point-check"
import SearchBox from "@/components/search-box"
import { SearchOutlined } from "@ant-design/icons"

const CheckboxGroup = Checkbox.Group
interface IProps {}
const test = [
  {
    id: 59198,
    modelId: 6,
    pointName: "Turstatus",
    pointDesc: "风机状态",
    pointType: "2",
    systemId: 101,
    coefficient: 1,
    unit: "",
    maximum: 100000,
    minimum: -100000,
    tags: {},
  },
]
const pageSizeOptions = [50, 100, 500, 1000]
export default function EditRulePoint(props: IProps) {
  const [currentCheck, setCurrentCheck] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    pageSize: 50,
    pageNum: 1,
  })
  const [showSearch, setShowSearch] = useState(false)
  const [searchPoint, setSearchPoint] = useState("")

  const { serCurCheckPoint, cursorInfo, exitPointList } = useContext(PiontContext)
  const actualPoints = useMemo(() => {
    if (!searchPoint) return exitPointList
    return exitPointList?.filter((i) => i.pointDesc?.includes(searchPoint)) || exitPointList
  }, [exitPointList, searchPoint])

  const changed = (e) => {
    // 光标没有在规则输入框时，选择无效
    if (!cursorInfo) return
    setCurrentCheck((prev) => {
      let res = []
      // 不支持反选
      if (prev?.length && prev.includes(e?.target.value)) {
        res = prev
      } else if (!prev.includes(e?.target.value)) {
        res = prev.concat([e.target?.value])
      }
      const pointDetail = dataSource?.find((i) => i.pointName === e.target?.value)
      serCurCheckPoint({ ...pointDetail })
      return [...res]
    })
  }
  const changeNum = (page, pageSize) => {
    pageInfo.pageSize = pageSize
    pageInfo.pageNum = page
    const actualShowPt = actualPoints?.slice((page - 1) * pageSize, page * pageSize)
    setDataSource(actualShowPt)
  }
  const closeSearch = useRef(() => {
    setShowSearch(false)
  })
  const searchDev = useRef((e) => {
    setSearchPoint(e)
    closeSearch.current()
    // setShowSearch(false)
  })
  useEffect(() => {
    if (!actualPoints?.length) return
    setTotal(actualPoints.length)
    setDataSource(actualPoints.slice(0, 50))
  }, [actualPoints])
  return (
    <div className="st-rule-point">
      <div className="rule-point-top">
        <CheckboxGroup value={currentCheck}>
          <div className="rule-point-ls">
            {dataSource?.map((i) => {
              return (
                <Checkbox key={i.pointName} value={i.pointName} onChange={changed}>
                  <span className="rule-point-val">{i.pointName}</span>
                  <span className="rule-point-name">{i.pointDesc}</span>
                </Checkbox>
              )
            })}
          </div>
        </CheckboxGroup>
      </div>
      {/* <Pagination {...pagination} /> */}
      <div className="btn-bottom">
        <Pagination
          size="small"
          total={total}
          pageSize={pageInfo.pageSize}
          showSizeChanger={true}
          pageSizeOptions={pageSizeOptions}
          onChange={changeNum}
        />
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<SearchOutlined size={10} style={{ fontSize: "1.0em" }} />}
          onClick={() => {
            setShowSearch(!showSearch)
            setSearchPoint("")
          }}
        />
      </div>
      {showSearch ? (
        <SearchBox placeholder="输入测点名称" setShowSearch={closeSearch.current} onSearch={searchDev.current} />
      ) : (
        ""
      )}
    </div>
  )
}
