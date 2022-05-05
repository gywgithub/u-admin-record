<template>
	<div class="profile">
		<el-row :gutter="30">
			<el-col :span="7">
				<div class="profile-content">
					<div class="profile-base">
						<img
							alt=""
							src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
						/>
						<div class="profile_name">Serati Ma</div>
						<div>海纳百川，有容乃大</div>
					</div>
					<div class="profile-info">
						<p><i class="el-icon-s-custom mr8" />交互专家</p>
						<p>
							<svg-icon icon-class="tree" class="mr8" />
							蚂蚁金服－某某某事业群－某某平台部－UED
						</p>
						<p>
							<i class="el-icon-map-location mr8" />浙江省杭州市
						</p>
					</div>
					<div
						class="ant-divider ant-divider-horizontal ant-divider-dashed"
						role="separator"
					></div>
					<div class="tags-warp">
						<div class="mu-tags">个性标签</div>
						<template v-for="(tag, index) in tags">
							<a-tooltip
								v-if="tag.length > 20"
								:key="tag"
								:title="tag"
								class="mb8"
							>
								<a-tag
									:key="tag"
									:closable="index !== 0"
									@close="() => handleClose(tag)"
								>
									{{ `${tag.slice(0, 20)}...` }}
								</a-tag>
							</a-tooltip>
							<a-tag
								v-else
								:key="tag"
								:closable="index !== 0"
								@close="() => handleClose(tag)"
								class="mb8"
							>
								{{ tag }}
							</a-tag>
						</template>
						<a-input
							v-if="inputVisible"
							ref="input"
							type="text"
							size="small"
							:style="{ width: '78px' }"
							:value="inputValue"
							@change="handleInputChange"
							@blur="handleInputConfirm"
							@keyup.enter="handleInputConfirm"
						/>
						<a-tag
							v-else
							style="background: #fff; borderstyle: dashed"
							@click="showInput"
						>
							<a-icon type="plus" />
						</a-tag>
					</div>
				</div>
			</el-col>
			<el-col :span="17"
				><div class="profile-content">
					<a-tabs default-active-key="1" @change="callbackTabs">
						<a-tab-pane key="1" tab="文章（8）">
							<a-list
								item-layout="vertical"
								size="large"
								:data-source="listData"
							>
								<a-list-item
									slot="renderItem"
									key="item.title"
									slot-scope="item, index"
								>
									<template
										v-for="{ type, text } in actions"
										slot="actions"
									>
										<span :key="type">
											<a-icon
												:type="type"
												style="margin-right: 8px"
											/>
											{{ text }}
										</span>
									</template>
									<img
										slot="extra"
										width="272"
										height="175"
										alt="logo"
										:src="item.img"
									/>
									<a-list-item-meta
										:description="item.description"
									>
										<a slot="title" :href="item.href">{{
											item.title
										}}</a>
									</a-list-item-meta>
									{{ item.content }}
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane key="2" tab="基础设置" force-render>
							Content of Tab Pane 2
						</a-tab-pane>
						<a-tab-pane key="3" tab="安全设置">
							Content of Tab Pane 3
						</a-tab-pane>
					</a-tabs>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
const listData = [
	{
		href: "https://www.antdv.com/",
		title: `Alipay`,
		description: "2021-10-12 12:31:45",
		img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
		content:
			"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
	},
	{
		href: "https://www.antdv.com/",
		title: `Angular`,
		description: "2021-11-23 11:00:21",
		img: "https://pic3.zhimg.com/50/v2-50e226671358c3a423a3a8cb22013e18_400x224.jpg",
		content:
			"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
	},
	{
		href: "https://www.antdv.com/",
		title: `Ant Design`,
		description: "2021-12-23 08:00:52",
		img: "https://pic2.zhimg.com/80/v2-057aee572e902c445e9e7ffeeeeb0478_720w.jpg?source=1940ef5c",
		content:
			"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
	},
	{
		href: "https://preview.pro.ant.design/dashboard/analysis/",
		title: `Ant Design`,
		description: "2021-12-23 08:00:52",
		img: "https://pic1.zhimg.com/50/v2-1e114428312532a7613333669c490364_720w.jpg?source=1940ef5c",
		content:
			"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
	},
];
import elephantTable from "@/components/template/elephantTable";
export default {
	name: "PersonalCenter",
	components: { elephantTable },
	computed: {},
	watch: {},
	data() {
		return {
			tags: ["很有想法的", "专注设计", "大长腿"],
			inputVisible: false,
			inputValue: "",
			listData,
			pagination: {
				onChange: (page) => {
					console.log(page);
				},
				pageSize: 3,
			},
			actions: [
				{ type: "star-o", text: "10k" },
				{ type: "like-o", text: "1.2k" },
				{ type: "message", text: "6852" },
			],
		};
	},
	created() {},
	mounted() {},
	methods: {
		callbackTabs(key) {
			console.log(key);
		},
		handleClose(removedTag) {
			const tags = this.tags.filter((tag) => tag !== removedTag);
			console.log(tags);
			this.tags = tags;
		},
		showInput() {
			this.inputVisible = true;
			this.$nextTick(function () {
				this.$refs.input.focus();
			});
		},
		handleInputChange(e) {
			this.inputValue = e.target.value;
		},
		handleInputConfirm() {
			const inputValue = this.inputValue;
			let tags = this.tags;
			if (inputValue && tags.indexOf(inputValue) === -1) {
				tags = [...tags, inputValue];
			}
			console.log(tags);
			Object.assign(this, {
				tags,
				inputVisible: false,
				inputValue: "",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .ant-list-item-meta-title > a {
	color: rgba(0, 0, 0, 0.85);
}
.profile {
	.profile-content {
		background-color: #fff;
		padding: 24px;
		.profile-base {
			box-sizing: border-box;
			margin-bottom: 35px;
			text-align: center;
			color: rgba(0, 0, 0, 0.85);
			font-size: 14px;
			img {
				width: 104px;
				height: 104px;
				margin-bottom: 20px;
			}
			.profile_name {
				margin-bottom: 4px;
				color: rgba(0, 0, 0, 0.85);
				font-weight: 500;
				font-size: 18px;
				line-height: 28px;
			}
		}
		.ant-divider {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			color: rgba(0, 0, 0, 0.85);
			font-size: 14px;
			font-variant: tabular-nums;
			line-height: 1.5715;
			list-style: none;
			font-feature-settings: "tnum", "tnum";
			border-top: 1px solid rgba(0, 0, 0, 0.06);
		}
		.ant-divider-horizontal {
			display: flex;
			clear: both;
			width: 100%;
			min-width: 100%;
			margin: 24px 0;
		}
		.ant-divider-dashed {
			background: 0 0;
			border: dashed rgba(0, 0, 0, 0.06);
			border-width: 1px 0 0;
		}
		.profile-info {
			color: rgba(0, 0, 0, 0.8);
			font-size: 14px;
			p {
				margin-bottom: 8px;
				padding-left: 20px;
			}
		}
		.tags-warp {
			.mu-tags {
				margin-bottom: 12px;
				color: rgba(0, 0, 0, 0.85);
				font-weight: 500;
			}
			.ant-tag {
				margin-bottom: 8px;
			}
		}
	}
}
</style>
