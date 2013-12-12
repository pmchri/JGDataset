#JGDataset for JAVA
###with JGDataset for Javascript
###사용하기 전, 반드시 라이센스를 확인하세요

#색인

###Documents

[라이브러리 개요](#summary)<br>
[라이브러리 사용을 위한 환경](#environment)<br>

###[JAVA Classes](#classes)

[com.jg.vo.JGDataset](#com.jg.vo.JGDataset)<br>
[com.jg.vo.JGDatasetColumn](#com.jg.vo.JGDatasetColumn)<br>
[com.jg.vo.JGDatasetRow](#com.jg.vo.JGDatasetRow)<br>

###[JavaScript](#forJavascript)

[javascript.JGDS](#javascript.JGDS)<br>

[javascript.JGDataset](#javascript.JGDataset)<br>
[javascript.JGDataset.validator](#javascript.JGDataset.validator)<br>

#Documents

<a name="summary"></a>
##라이브러리 개요

* JGDataset은 보다 편리하게 행열이 필요한 데이타작업을 수행합니다.<br>
* 기본,삽입,삭제 의 행에 대한 상태와 기본,수정 의 열값에 대한 상태를 구현하여 작업에 분기율를 높였습니다.<br>
* 작업데 대한 수정 전, 후의 정보보존을 보장합니다.<br>
* Javascript 라이브러리와 호환성을 보장하여 보다 넓은 용도로 사용이 가능합니다.

###계략적 구조

<pre>
JGDataset
	- 열정보
		- [JGDatasetColumn]+
	- 원본 열정보
		- [JGDatasetColumn]+
		
	- 행정보
		- [JGDatasetRow]+
	- 원본 행정보
		- [JGDatasetRow]+
		
	- 삭제행정보
		- [JGDatasetRow]+
</pre>

<a name="datasetJSONTemplate"></a>
###JSON 구조
	
	//스키마가 있을 경우
	{"columninfo" : [
			{"name" : "열명1", "isKey" : false}
			,{"name" : "열명2", "isKey" : false}
			,...
		]
		
	,"rowdata" : [
		{"row" : {
					"열명1" : {"value" : 열값1}
					,"열명2" : {"value" : 열값2}
					,...
				},"status" : 0
			}
			, ...
		]
		
	,"deletedRowdata" : [
		{"row" : {
					"열명1" : {"value" : 열값1}
					,"열명2" : {"value" : 열값2}
					,...
				},"status" : 0
			}
			, ...
		]
	}
	
	//스키마가 없을 경우
	[{"열명1" : value_, "COL2" : 열값1}
	,{"열명2" : value1_, "COL2" : 열값2}
	, ...]

<a name="environment"></a>
##라이브러리 사용을 위한 환경

###JGDataset for JAVA 라이브러리는<br>
* [JDOM 라이브러리](http://www.jdom.org/)가 필요합니다.<br>
* [Simple JSON 라이브러리](https://code.google.com/p/json-simple/)가 필요합니다.<br>

<a name="environmentForJavascript"></a>
###JGDataset for JavaScript 라이브러리는<br>
* [JQuery(v1.9.x 이상)](http://jquery.com/)가 필요합니다.<br>
* [JQuery UI(v1.9.x 이상)](http://jqueryui.com/)와 호환됩니다.<br>
* [JQuery Mobile(v1.3.x 이상)](http://jquerymobile.com/)과 호환됩니다.<br>

<a name="classes"></a>
#JAVA Classes

<a name="com.jg.vo.JGDataset"></a>
##com.jg.vo.JGDataset

행열이 필요한 데이타작업을 수행할 수 있도록 설계되었으며 Web개발을 고려, JSON형식으로 불러오기, 내보내기가 가능합니다.<br>

###생성자
	
JSON문자열을 JGDataset에 적용시켜 생성할 수 있습니다.<br>
JSON문자열을 적용하기 위한 JSON 양식에 대한 자세한 내용은 [여기](#datasetJSONTemplate)를 참조하세요.

	public JGDataset();
	public JGDataset(String JSON문자열);
	public JGDataset(Object JSON오브젝트);

###주요함수
<a name="howToInsertColumn"></a>
####열([JGDatasetColumn](#com.jg.vo.JGDatasetColumn))을 추가,삭제, 특정 열을 가져올 수 있는 함수
	
	//삽입
	public JGDatasetColumn insertColumn(String 열명, int 열색인);
	
	//마지막 색인에 삽입
	public JGDatasetColumn addColumn(String columnName_);
	
	//다중 삽입
	public void addColumns(String... 복수의 열명);
	
	//삭제 
	public void removeColumn(int 열색인);
	public void removeColumn(JGDatasetColumn 열);
	public void removeColumn(String 열명);
	
	//가져오기
	public JGDatasetColumn getColumn(int 열색인);
	public JGDatasetColumn getColumn(String 열명);
	
	//열색인 검색
	public int indexOfColumn(JGDatasetColumn 열);
	public int indexOfColumn(String 열명);
<br>
####외부연동을 위한 키열에 대한 작업 함수
	
	//키열 설정
	public void setKeyColumn(int 열색인, boolean 키여부);
	public void setKeyColumn(String 열명, boolean 키여부);
	
	//키열 내역 가져오기
	public ArrayList<JGDatasetColumn> getKeyColumnList();

<a name="howToInsertRow"></a>
<br>
####행([JGDatasetRow](#com.jg.vo.JGDatasetRow))을 추가,삭제, 특정 열을 가져올 수 있는 함수
삭제된 행는 기존 행과 별도로 관리됩니다. 
	
	//삽입
	public void insertRow(int 행색인);
	
	//마지막 색인에 삽입
	public int addRow();
	
	//삭제
	public void removeRow(int 행색인);
	
	//가져오기
	public JGDatasetRow getRow(int 행색인);
	
	//삭제행 가져오기
	public JGDatasetRow getDeletedRow(int 삭제행색인);
	
	//삭제행색인 검색
	public int indexOfDeletedRow(JGDatasetRow 삭제행);
<br>
####임의로 행상태를 변경, 행수정여부를 검사할 수 있는 함수

	//행상태 수정
	public void setRowStatus(int 행색인, int 행상태);
	
	//행수정여부 검사
	public boolean isModified();
<br>
####하나의 열값이나 복수의 열값을 수정할 수 있는 함수
수정된 열값에 따라 열상태가 변경됩니다.<br>
복수의 열값을 수정할 때는 Object형식의 배열로 표기하며, 형식은 아래와 같습니다.<br>
<code>
new Object[](){"열명1","열값1","열명2","열값2",...};
</code>
	
	//열값 수정
	public void setColumnValue(String 열명, int 행색인, Object 값, boolean 열이 존재하지 않을 때 열삽입여부);
	public void setColumnValue(int 열색인, int 행색인, Object 값);
	
	//복수의 열값 수정
	public void setColumnValues(int 행색인, Object[] 열명과열값, boolean 열이 존재하지 않을 때 열삽입여부);
	
	//열값 가져오기
	public Object getColumnValue(String 열명, int 행색인);
	public Object getColumnValue(int 열색인, int 행색인);
	
	//열값수정여부
	public boolean isColumnModified(String 열명, int 행색인);
	public boolean isColumnModified(int 열색인, int 행색인);
	
	//삭제된 열값 가져오기
	public Object getDeletedColumnValue(String 열명, int 행색인);
<br>
####JGDataset 전체데이타를 제어할 수 있는 함수

	//변경사항 저장 - 모든 수정상태를 일반으로 변경
	public void apply();
	
	//변경사항 초기화 - 원본 열행정보로 복귀
	//public void reset();
	
	//모든 행열(원본정보 포함)에 대한 정보를 삭제합니다.
	public void clear(boolean 열삭제여부);
<br>
####JSON 가져오기, 내보내기 함수
JSON 형식으로 가져오기 또는 내보내기를 수행합니다.

	//JSON 내보내기
	public JSONObject toJSON();

	//JSON 문자열 내보내기
	public String toJSONString();

	//JSON 문자열부터 가져오기
	public void applyJSON(String JSON문자열);
	public void applyJSON(Object JSON오브젝트);

<a name="com.jg.vo.JGDatasetColumn"></a>
##com.jg.vo.JGDatasetColumn

열에 대한 정보를 정의하는 클래스입니다.

###생성자

[JGDataset의 열삽입 함수](#howToInsertColumn)로 생성할 수 있습니다.

<a name="com.jg.vo.JGDatasetRow"></a>
##com.jg.vo.JGDatasetRow

행에 대한 정보를 정의하는 클래스입니다.

###생성자

[JGDataset의 행삽입 함수](#howToInsertRow)로 생성할 수 있습니다.

<a name="forJavascript"></a>
#JavaScript

JGDataset for JavaScript를 이용하여 Web에서도 행열단위의 작업을 수행할 수 있습니다.<br>
사용을 위한 필요환경에 대한 정보는 [여기](#environmentForJavascript)를 참고하세요.

<a name="javascript.JGDS"></a>
##javascript.JGDS

JGDS는 JGDataset for Javascript 관리를 위한 공유객체입니다.<br>
JGDS를 통해 생성된 JGDataset는 인스턴스에 남게 되며 필요할 때 호출할 수 있습니다.<br>
또한, HTML와 JGDataset을 매핑하는 기능을 제공함으로 보다 유연한 JGDataset 작업을 수행할 수 있습니다.
	
	//형식
	JGDS(색인|데이타셋명 [, JSON|JSONString]);
	
	//생성
	var dataset1_ = JGDS(데이타셋명);
	var dataset2_ = JGDS(데이타셋명, JSON|JSONString);
	
	//복수의 데이터셋 생성
	JGDS.make(데이터셋명1 [, 데이터셋명2, ...]);
	
	//삭제
	JGDS.remove(데이터셋명);
	JGDS.remove(색인);
	
	//가져오기
	var dataset1_ = JGDS(색인);
	var dataset2_ = JGDS(데이타셋명);
<br>	
###JQuery 이벤트 리스너

JGDS가 적재되기 전,후 의 이벤트 리스너를 정의할 수 있습니다.

	//JGDS가 적재되기 전
	$(JGDS).on("beforeload", function(){
		// 여기에서 JGDataset을 생성하는 것을 추천합니다.
	});
	
	//JGDS가 적재된 후
	$(JGDS).on("afterload", function(){
		// ...
	});
<br>
###HTML에 매핑하기
JGDataset를 HTML에 매핑하여 보다 편리하게 JGDataset 작업을 수행할 수 있습니다.<br>
매핑된 JGDataset을 수정하면 즉각적으로 HTML에 반영됩니다.<br>
HTML태그에 속성값만 추가하면 간단하게 자동으로 HTML과 매핑됩니다.<br>

####JavaScript
<pre>
$(JGDS).on("beforeload", function(){
	// 자동매핑 작업은 "beforeload" 이벤트 직후에 이루어지기 때문에
	// 여기에 데이타셋을 생성하는 해야만 합니다.
	
	var dataset_ = JGDS("매핑데이타셋");
	dataset_.setColumnValues(dataset_.addRow(),["col1", "testValue", "col2", 123],true);
});
</pre>
####HTML

	<html>
	<head>...</head>
	<body>
	
	// 특정태그 jg-dataset 속성값에 매핑할 데이타셋명을 정의합니다.
	// div태그 외, 다른 태그도 사용가능합니다.
	<div jg-dataset="매핑데이타셋">
		
		// 반드시 행데이타가 될 태그 하나만 존재해야 합니다.
		// 매핑된 태그의 자식태그가 복수로 존재한다면 정상적인 매핑이 이루어지지 않습니다.
		<p>
			// 열매핑은 열매핑을 지원하는 태그에 jg-column을 정의합니다.
			// 열매핑을 지원하는 태그의 종류
			// 라벨형식 : label, span, p, 등
			// 입력형식 : input, select, textarea, div[contenteditable] 등
			
			// 라벨형식
			// UI를 통한 데이타수정은 불가능하며
			// 데이타셋이 수정되면 결과를 UI에 반영합니다.
			<label jg-column="col1" />
			<span jg-column="col2" />
			<p jg-column="col1" />
			
			// 입력형식
			// UI를 통한 데이타수정이 가능하며
			// UI를 통하여 수정된 데이타는 데이타셋에 반영되며
			// 데이타셋이 수정되면 역시 UI에 반영됩니다.
			
			//input - text,password,checkbox 등
			<input type="text" jg-column="col1">
			
			// select
			// select 태그의 option 데이타를 외부 데이타셋에 매핑하여 사용할 수 있습니다.
			// option값을 외부 데이타셋에 동기화하여 자동생성됩니다.
			
			//select - 기본
			<select jg-column="col1">
				<option value="001">테스트1</option>
				<option value="002">테스트2</option>
				...
			</select>
			
			//select - 외부데이타셋 참조
			<select jg-column="col2"
				jg-bind-dataset="외부데이타셋"
				jg-display-column="option에 제목으로 참조할 외부데이타셋 열명"
				jg-value-column="options에 값으로 참조할 외부데이타셋 열명"
				[jg-blank-title="options에 null을 추가하며 제목으로 표기할 문자열"] />
			
		</p>
		
	</div>
	
	</body>
	</html>
	
###열단순참조

행매핑된 태그 안에 <code>##참조명##</code> 형식으로 데이타셋의 행색인이나 열값을 참조할 수 있습니다.

* 표현식에서 <code>##dataset.rowIndex##</code>로 데이타셋 행색인을 가져올 수 있습니다.
* 표현식에서 <code>##dataset.rowStatus##</code>로 데이타셋 행상태을 가져올 수 있습니다.
* 해당 행의 열을 <code>##열명##</code>로 참조할 수 있습니다.
	
	
		<div jg-dataset="dataset">
			<p>
				
				// 행색인 참조
				##dataset.rowIndex##
				
				//행상태 참조
				##dataset.rowStatus##
				
				// 열값 참조
				##col1##
				
			</p>
		</div>

###표현식

JGDataset for JavaScript는 HTML매핑 시, 간단한 표현식을 지원합니다.<br>

####표현식형식
표현식은 행매핑된 자식태그에 속성값 또는 자식문자열로 정의가 가능합니다.<br>
jg-column값을 제외한 모든 속성값에 정의할 수 있습니다.<br>
자식문자열로 정의할 경우 문자열 외 다른 자식태그가 있다면 표현식은 생략됩니다.<br>
열단순참조도 혼용이 가능합니다.

* 표현식 형식은 <code>##fx:</code>로 시작합니다.<br>


		<div jg-dataset="dataset">
			<p>
				
				// 결과값 - (행색인+1)번째 행
				<label>##fx:(##dataset.rowIndex##+1)+"번째 행"</label>
				
				// 행상태가 '삽입'이 아닐 때 readonly 속성값을 'readonly'로 변경
				<input type="text" jg-column="col1" readonly="##fx:##dataset.rowStatus## != 1 ? 'readonly' : 'false'">
				
				// col1 열값을 'lock'으로 입력했을 때 readonly 속성값을 'readonly' 로 변경
				<input type="text" jg-column="col1" readonly="##fx:##col1## == 'lock' ? 'readonly' : 'false'">
				
				// col1 과 col2의 차
				<label>##fx:##col1## - ##col2##</label>
	
			</p>
		</div>


<a name="javascript.JGDataset"></a>
##javascript.JGDataset

###생성자

인스턴스를 생성할 때, 옵션인자를 사용합니다.<br>
옵션인자는 JSON이나 JSONString의 형식을 취합니다.<br>
옵션인자로 넘어간 값은 JGDataset의 JSON 형식을 취하며 초기화시 적용됩니다.<br>
JSON형식에 대한 자세한 정보는 [여기](#datasetJSONTemplate)를 참조하세요.
	
	//멤버변수로 사용 (일회성)
	var dataset_ = new JGDataset([JSON|JSON문자열]*);
	
	//JGDS를 통한 생성, 인스턴스로 사용 (보존성)
	var dataset_ = JGDS(데이타셋명 [, JSON|JSON문자열]*);
	

###주요함수
JGDataset for JAVA와 거의 동일한 함수를 제공합니다.<br>
JGDataset for JavaScript에서만 사용할 수 있는 주요함수는 아래와 같습니다.<br><br>

####행정렬함수
데이타셋 내 행을 열값의 의거해 정렬합니다.

	//행이동
	dataset_.moveRow(기존인덱스, 새로운인덱스);
	
	//행정렬
	dataset_.sortRow(기준열명or열색인, function(비교컬럼값1, 비교컬럼값2){
		return 정렬값
	});
	
	//행정렬 - 오름차순
	dataset_.sortRowByAsc(기준열명or열색인);

	//행정렬 - 내림차순
	dataset_.sortRowByDesc(기준열명or열색인);

####수정된 데이타만 추출
데이타셋 내 수정된 데이타만 JGDataset로 추출할 수 있습니다.

	//JGDataset 형식으로 추출
	var otherDataset_ = dataset_.exportModifiedData();
	
	//JSON 형식으로 추출
	var json_ = dataset_.exportModifiedDataToJSON();
<br>
####행통계를 위한 함수
특정의 열에 대한 행통계를 위한 함수입니다.
	
	//합계
	var sum_ = dataset_.sumOfColumnValues(열명or열색인, function(열명, 행색인){
		//여기에 여과프로세스를 정의할 수 있습니다.
		//return값이 false일 경우 해당 행은 통계에서 제외됩니다.
		return ...;
	});
	
	//평균
	var avg_ = dataset_.avgOfColumnValues(열명or열색인, function(열명, 행색인){
		//여과프로세스
		return ...;
	});
	
	//최대값
	var max_ = dataset_.maxOfColumnValues(열명or열색인, function(열명, 행색인){
		//여과프로세스
		return ...;
	});
	
	//최소값
	var min_ = dataset_.minOfColumnValues(열명or열색인, function(열명, 행색인){
		//여과프로세스
		return ...;
	});
<br>	
####JSON 내보내기, 가져오기

JSON이나 JSON문자열을 내보내거나 가져올 수 있습니다.<br>
JSON형식에 대한 자세한 정보는 [여기](#datasetJSONTemplate)를 참조하세요.

	//내보내기 (JSON)
	var json_ = dataset_.toJSON();
	
	//내보내기 (JSON문자열)
	var jsonString_ = dataset_.toJSONString();
	
	//가져오기
	dataset_.applyJSON([JSON|JSON문자열]);
<br>	
####JQuery 이벤트 리스너 등록

JGDataset for JavaScript는 JQuery 이벤트 리스너등록이 가능합니다.<br>

	//행이 삽입되었을 때
	$(dataset_).on("rowinserted", function(행색인){
		//...
	});
	
	//행이 삭제되었을 때
	$(dataset_).on("rowremoved", function(행색인){
		//...
	});
	
	//열이 추가되었을 때
	$(dataset_).on("columninserted", function(열명){
		//...
	});
	
	//열이 삭제되었을 때
	$(dataset_).on("columnremoved", function(열명){
		//...
	});
	
	//열값이 변경 되었을 때
	$(dataset_).on("columnchanged", function(열명,행색인){
		//...
	});
	
	//데이타셋이 전체삭제되었을 때
	$(dataset_).on("datasetclear", function(){
		//...
	});
	
	//데이타셋이 초기화되었을 때
	$(dataset_).on("datasetreset", function(){
		//...
	});
	
	//데이타셋이 외부 JSON에 의하여 변경되었을 때
	$(dataset_).on("datasetchanged", function(){
		//...
	});
	
<a name="javascript.JGDataset.validator"></a>	
##javascript.JGDataset.validator

JGDataset.validator는 JQuery widget으로 구현된 JGDataset 유효성검사 라이브러리입니다.<br>
기본적인 유효양식과 함께 사용자가 정의한 임의의 유효양식을 검사에 사용할 수 있습니다.<br>

###기본사용법

####JavaScript를 이용하여 초기화하는 방법

JGDataset.validator를 초기화,사용하는 2가지 방법을 제공합니다.<br>
사용자가 편한 방법으로 선택하여 사용하면 됩니다.
	
	$(JGDS).on("afterload",function(){
	
		JGDS("데이타셋명").validator([JSON옵션]);
		
		//OR
		
		$(JGDS("데이타셋명")).JGValidator([JSON옵션]);
		
	});
	
####HTML매핑을 이용하여 초기화하는 방법

	<div jg-dataset="매핑데이타셋" jg-dataset-validator>
	...
	</div>
	
위 JavaScript를 이용한 방법과 HTML매핑을 이용한 방법의 결과는 서로 동일합니다.<br>
단, HTML매핑을 이용하는 방법은 생성 시, 옵션을 정의할 수 없는 단점이 있습니다.<br>
되도록 JavaScript를 이용하는 것을 추천합니다.

###기본옵션설정

JavaScript를 이용하여 초기화를 했을 때, JSON형식의 옵션을 정의할 수 있습니다.<br>
기본옵션은 아래와 같습니다.<br>

	{options : {
		errorMessageTag : "<span style='display:block;' />" //오류라벨형식
		,stepValidation : true //순차유효성 
		}
		,failedMessages : {...}
		,commonFailedMessages : {
			required : "field is required"
			,maxLength : "max length : {length}"
			,minLength : "min length : {length}"		
			...
		}
	};
	
인자로 옵션을 별도로 정의하지 않고 초기화하면 기본옵션으로 인식합니다.

###유효성검사하기

JGDataset 열이 매핑된 HTML태그에 원하는 유효성 요소의 이름을 속성값으로 정의하면 유휴성 검사대상으로 등록됩니다.

####HTML
	<div jg-dataset="매핑데이타셋" jg-dataset-validator>
	<p>
		<input type="text" jg-column="열명" required>
	</p>	
	</div>
####JavaScript
<pre>
function checkValidate(){
	
	$(유효성검사가매핑된데이타셋).JGValidator("fullValidate", function(){
		//유효성 검사 종료 callback	
	});
	
	//OR
	
	유효성검사가매핑된데이타셋.validator("fullValidate", function(){
		//유효성 검사 종료 callback	
	});
}
</pre>

JGDataset의 유효성 여부는 데이타셋의 값이 변경될 때마다 수시로 정검합니다.<br>
사용자가 원하는 때에 유효성 여부를 확인할 수 있습니다.

	var bool_ = 유효성검사가매핑된데이타셋.validator("isValid");
	
	//OR
	
	var bool_ = $(유효성검사가매핑된데이타셋).JGValidator("isValid");
	
###오류라벨과 오류메세지
JGDataset.validator는 오류라벨을 지원합니다.<br>행이 매핑된 HTML태그 안에 에러라벨태그를 정의하면 됩니다.<br>
유효성 검사 대상 열과 매핑하기 위해서 오류라벨태그에 jg-error-column 속성값을 정의하여 열명과 일치시킵니다.<br>


	<div jg-dataset="매핑데이타셋" jg-dataset-validator>
	<p>
		<input type="text" jg-column="열명" required>
		<labal jg-error-column="열명"></label>
	</p>	
	</div>
	
JGDataset.validator의 기본옵션 errorMessageTag 를 변경하여 원하는 오류라벨을 재정의할 수 있습니다.

	유효성검사가매핑된데이타셋.validator("errorMessageTag","<span></span>");
	
	//OR
	
	var bool_ = $(유효성검사가매핑된데이타셋).JGValidator("errorMessageTag","<span></span>");
	
JGDataset.validator가 유효성검사를 수행하고 유효하지 않는 값에 대한 오류메세지를 오류라벨에 표기합니다.<br>
사용자가 원하는 문자열을 등록하여 사용할 수 있습니다.

	유효성검사가매핑된데이타셋.validator("failedMessages",{
		"열명" : {
				"유효성요소명" : "에러메세지"
		}
		, ...
	});
	
	//OR
	
	var bool_ = $(유효성검사가매핑된데이타셋).JGValidator("failedMessages",{
		"열명" : {
				"유효성요소명" : "에러메세지"
		}
		, ...
	});

또한, 문자열 내 간단한 표현식을 제공합니다.
####기본제공표현식

	{columnValue} - 열값
	{columnName} - 열명
	{rowIndex} - 행색인
	
	//예제
	"{columnName}열의 {rowIndex}행 값이 유효하지 않음({columnValue})"
	  -> "col1열의 0행 값이 유효하지 않음(testValue)"
	
###기본제공 유효성 요소

####required
필수항목 유효성입니다. 값이 비어있다면 유효하지 않습니다.<br>

####maxLength
최대길이 유효성입니다.

	//표현식
	{length} - 최대길이

####minLength
최소길이 유효성입니다.

	//표현식
	{length} - 최소길이

####length
길이 유효성입니다. 값이 길이와 같아야 유효합니다.

	//표현식
	{length} - 길이

####range
범위값 유효성입니다. 숫자만 유효하며 범위안에 값만 유효합니다.

	//표현식
	{from} - 최소값
	{to} - 최대값

####rangeLength
길이범위 유효성입니다. 범위안에 길이만 유효합니다.

	//표현식
	{from} - 최소길이
	{to} - 최대길이
	
####equals
값의 일치 유효성입니다. 값이 같아야 유효합니다.

	//표현식
	{value} - 유효값

####pattern
정규식일치 유효성입니다. 값이 정규식에 맞아야 유효합니다.

	//표현식
	{pattern} - 유효 정규식
	
####patternWord
글자 패턴 유효성입니다. 값이 글자로만 구성되어야 유효합니다.

####patternAlphabet
알파벳 패턴 유효성입니다. 값이 알파벳으로만 구성되어야 유효합니다.

####patternAlphanum
알파벳,숫자 혼용 패턴 유효성입니다. 값이 알파벳과 숫자로만 구성되어야 유효합니다.

####patternEmail
이메일 패턴 유효성입니다. 값이 이메일형식이야 유효합니다.

####patternPhone
휴대전화 패턴 유효성입니다. 값이 휴대전화 형식이야 유효합니다.

####columnEqauls
행열값일치 유효성입니다. 해당 형과 열의 값이 같아야 유효합니다.

	//표현식
	{value} - 대상 열명

####columnNotEqauls
행열값불일치 유효성입니다. 해당 형과 열의 값이 같지 않아야 유효합니다.

	//표현식
	{value} - 대상 열명
