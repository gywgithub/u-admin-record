<template>
	<div class="permission">
		<div class="mainBody">
			<div class="itemWarp">
				<div
					class="item mt20"
					v-for="(item, index) in roleData"
					:key="index"
				>
					<el-checkbox
						v-model="checkAllGather[checkAllGatherArray[index]]"
						class="perTitle"
						:indeterminate="
							indeterminateGather[indeterminateGatherArray[index]]
						"
						@change="handleCheckAllChange(item, index)"
						>{{ item.title }}</el-checkbox
					>
					<el-checkbox-group
						v-model="checkedGather[checkedGatherArray[index]]"
						@change="
							(checked) =>
								handleCheckedChange(checked, item, index)
						"
						class="mt20"
					>
						<el-checkbox
							v-for="(citem, cindex) in item.elementList"
							:label="citem.label"
							:value="citem.value"
							:key="cindex"
						></el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Permission",
	props: {
		roleData: {
			type: Array,
			default: () => [],
			required: true,
		},
	},
	components: {},
	computed: {},
	watch: {},
	data() {
		return {
			tabPosition: "left",
			checkAllGather: {},
			checkAllGatherArray: [],
			checkedGather: {},
			checkedGatherArray: [],
			indeterminateGather: {},
			indeterminateGatherArray: [],
		};
	},
	created() {
		this.initData();
	},
	mounted() {},
	methods: {
		initData() {
			this.createCheckAllKeys();
			this.createCheckedKeys();
			this.createIndeterminateKeys();
			this.initCheckedData();
		},
		initCheckedData() {
			let data = this.roleData;
			for (let i = 0; i < data.length; i++) {
				for (let j = 0; j < data[i].elementList.length; j++) {
					if (data[i].elementList[j].isChecked) {
						this.checkedGather[`checkedPermission${i}`].push(
							data[i].elementList[j].label
						);
					}
				}
				let checkedCount = data[i].elementList.length;
				let cpLen = this.checkedGather[`checkedPermission${i}`].length;
				if (cpLen === checkedCount) {
					this.checkAllGather[`checkAll${i}`] = true;
				}
				if (cpLen > 0 && cpLen < checkedCount) {
					this.indeterminateGather[`indeterminate${i}`] = true;
				}
			}
		},
		//生成全选要用的动态key
		createCheckAllKeys() {
			let data = this.roleData;
			for (let i = 0; i < data.length; i++) {
				this.$set(this.checkAllGather, `checkAll${i}`, false);
				this.checkAllGatherArray.push(`checkAll${i}`);
			}
		},
		//生成所选元素要用的动态key
		createCheckedKeys() {
			let data = this.roleData;
			for (let i = 0; i < data.length; i++) {
				this.$set(this.checkedGather, `checkedPermission${i}`, []);
				this.checkedGatherArray.push(`checkedPermission${i}`);
			}
		},
		createIndeterminateKeys() {
			let data = this.roleData;
			for (let i = 0; i < data.length; i++) {
				this.$set(this.indeterminateGather, `indeterminate${i}`, false);
				this.indeterminateGatherArray.push(`indeterminate${i}`);
			}
		},
		handleCheckAllChange(curr, i) {
			if (this.checkAllGather[`checkAll${i}`]) {
				for (let j = 0; j < curr.elementList.length; j++) {
					this.checkedGather[`checkedPermission${i}`].push(
						curr.elementList[j].label
					);
				}
			} else {
				this.checkedGather[`checkedPermission${i}`] = [];
			}
			this.indeterminateGather[`indeterminate${i}`] = false;
		},
		handleCheckedChange(value, curr, i) {
			let checkedCount = value.length;
			this.checkAllGather[`checkAll${i}`] =
				checkedCount === curr.elementList.length;
			this.indeterminateGather[`indeterminate${i}`] =
				checkedCount > 0 && checkedCount < curr.elementList.length;
		},
	},
};
</script>

<style lang="scss" scoped>
.permission {
	.perTitle {
		font-weight: bold;
		font-size: 14px;
	}
	.item {
		padding-bottom: 20px;
		border-bottom: 1px #f2f2f2 solid;
	}
}
</style>
