<template>
	<div class="confirm-popover disInlineBlock">
		<el-popover placement="bottom" v-model="visible" :trigger="triggerType">
			<div class="confirm-popover-popover">
				<!-- 简单提示内容 -->
				<p class="confimStyle" v-if="!advanced">
					<span
						class="mr10 font20"
						:class="iconClass"
						:style="iconStyle"
						v-if="popoverIcon"
					></span
					>{{ textMessage }}
				</p>
				<!-- 自定义提示内容 -->
				<slot></slot>
			</div>
			<div class="operate-btns mt20">
				<el-button class="w45pct" @click="visible = false">{{
					cancelTxt
				}}</el-button>
				<el-button
					type="primary"
					class="w45pct mlpct10-imp"
					@click="fireHandler"
					>{{ confirmTxt }}</el-button
				>
			</div>
			<el-button
				v-if="!advancedBtn"
				:type="adsorptionBtnType"
				:plain="isPlain"
				:icon="adsorptionBtnIcon"
				:disabled="btnDisabled"
				slot="reference"
			>
				{{ adsorptionTxt }}
			</el-button>
			<el-button
				v-if="advancedBtn"
				:type="adsorptionBtnType"
				:plain="isPlain"
				:icon="adsorptionBtnIcon"
				:disabled="btnDisabled"
				slot="reference"
			>
				<slot name="btnContent"></slot>
			</el-button>
		</el-popover>
	</div>
</template>

<script>
export default {
	name: "ConfirmPopover",
	props: {
		// 按钮大小
		size: {
			type: String,
			default: "small",
		},
		//被吸附的按钮是否禁用
		btnDisabled: {
			type: Boolean,
			default: false,
		},
		//是否朴素按钮
		isPlain: {
			type: Boolean,
			default: true,
		},
		//是否开启自定义提示内容
		advanced: {
			type: Boolean,
			default: false,
		},
		//是否开启自定义按钮内的内容(如果想自定义btn内容，advancedBtn必须为true)
		advancedBtn: {
			type: Boolean,
			default: false,
		},
		//是否需要icon
		popoverIcon: {
			type: Boolean,
			default: true,
		},
		//popover中的icon 图标
		iconClass: {
			type: String,
			default: "el-icon-warning",
		},
		//popover中的icon 行内样式
		iconStyle: {
			type: Object,
			default: function () {
				return { color: "#f56c6c" };
			},
		},
		//popover触发方式
		triggerType: {
			type: String,
			default: "click",
			required: false,
		},
		//提示文案
		textMessage: {
			type: String,
			default: "Hello world!!!",
			required: false,
		},
		//被吸附的按钮文案
		adsorptionTxt: {
			type: String,
			default: "按钮",
			required: false,
		},
		//被吸附的按钮的类型
		adsorptionBtnType: {
			type: String,
			default: "primary",
			required: false,
		},
		//被吸附的按钮的icon
		adsorptionBtnIcon: {
			type: String,
			default: "",
			required: false,
		},
		//取消按钮文案
		cancelTxt: {
			type: String,
			default: "取消",
			required: false,
		},
		//确认按钮文案
		confirmTxt: {
			type: String,
			default: "确定",
			required: false,
		},
	},
	components: {},
	computed: {},
	watch: {},
	data() {
		return {
			visible: false, //popover显示与隐藏
		};
	},
	mounted() {},
	methods: {
		fireHandler() {
			this.visible = false;
			this.$emit("emitCallback");
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .el-icon-warning:before {
	content: "\e7a3" !important;
}
::v-deep .el-button {
	min-width: 60px;
}
.confirm-popover-popover {
	.confimStyle {
		color: #606266;
		font-size: 14px;
	}
}
</style>
