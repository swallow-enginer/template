import AppBar from "@comp/appBar";
import TemplateList from "@comp/templateList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";

export default function Home() {
  const router = useRouter();

  /**
   * テンプレート追加
   */
  const addTemplate = () => {
    router.push(AppConst.URL.TEMPLATE_INPUT)
  }
  return (
    <>
      <AppBar onButtonClick={addTemplate}/>
      <TemplateList />
      {/* <Test /> */}
    </>
  )
}
