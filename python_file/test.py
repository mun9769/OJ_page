from selenium import webdriver
# driver = webdriver.Chrome('C://Users//New//Desktop//OJ_page//python_file//chromedriver.exe')
driver = webdriver.Chrome('C://Users//user//Desktop//OJ_page//python_file//chromedriver.exe')
url = 'https://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.htm'

driver.get(url)

iframe = driver.find_element_by_id("ifmdtl")
driver.switch_to.frame(iframe)

############# table name #################
test = driver.find_element_by_tag_name("thead")
title_row = test.find_element_by_css_selector("*")
title_col = title_row.find_elements_by_css_selector("*")
# for ele in title_col:
    # print(ele.get_attribute("innerText"))
##########################################

############# select #################
select_section = driver.find_element_by_id('ddlDept')
select_btn = driver.find_element_by_id("ibtnSearch1")

majors = select_section.find_elements_by_tag_name('option')
majors_len = len(majors)

for i in range(majors_len):
    driver.execute_script("document.querySelector('#ddlDept').children[{}].setAttribute('selected', 'selected')".format(i))
    select_btn = driver.find_element_by_id("ibtnSearch1")
    select_btn.click()

    # iframe = driver.find_element_by_tag_name('iframe')
    # driver.switch_to.frame(iframe)
    
    a = 10
##########################################

############# element #################
tbody = driver.find_element_by_tag_name('tbody')
rows = tbody.find_elements_by_tag_name('tr')

for row in rows:
    cols = row.find_elements_by_tag_name('td')
    for col in cols:
        print(col.get_attribute('innerText'))
##########################################



while True:
    print()



# import requests

# req = requests.get('https://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.htm')
# print(req.text)